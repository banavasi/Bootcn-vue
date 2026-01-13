<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ref, computed, inject, watch } from "vue";
import { cn } from "@bootcn-vue/core";
import { INPUT_INJECTION_KEY } from "../context";

interface Props {
  mask?: string;
  tokens?: Record<string, { pattern: RegExp; transform?: (char: string) => string }>;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  tokens: () => ({
    "#": { pattern: /\d/ }, // digit
    "%": { pattern: /[a-zA-Z]/ }, // letter
    "@": { pattern: /[a-zA-Z0-9]/ }, // alphanumeric
    "*": { pattern: /./ }, // any character
  }),
});

const context = inject(INPUT_INJECTION_KEY);
if (!context) {
  throw new Error("InputMasked must be used within InputRoot");
}

const model = defineModel<string>();
const inputRef = ref<HTMLInputElement>();
const displayValue = ref("");

const emit = defineEmits<{
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

// Get unmasked value (only the actual input characters)
const unmaskedValue = computed(() => {
  if (!props.mask) return displayValue.value;
  let unmasked = "";
  for (let i = 0; i < displayValue.value.length; i++) {
    const maskChar = props.mask[i];
    const inputChar = displayValue.value[i];
    if (maskChar && props.tokens[maskChar]) {
      unmasked += inputChar;
    }
  }
  return unmasked;
});

// Apply mask to input value
const applyMask = (value: string): string => {
  if (!props.mask) return value;

  let masked = "";
  let valueIndex = 0;

  for (let i = 0; i < props.mask.length && valueIndex < value.length; i++) {
    const maskChar = props.mask[i];
    const token = props.tokens[maskChar];

    if (token) {
      // This position expects input based on token pattern
      const inputChar = value[valueIndex];
      if (token.pattern.test(inputChar)) {
        masked += token.transform ? token.transform(inputChar) : inputChar;
        valueIndex++;
      } else {
        // Invalid character, skip it
        valueIndex++;
        i--; // Try this mask position again with next character
      }
    } else {
      // This is a literal character in the mask (like "-", "/", etc.)
      masked += maskChar;
      // If the user typed this literal, skip it
      if (value[valueIndex] === maskChar) {
        valueIndex++;
      }
    }
  }

  return masked;
};

// Validate if a character is valid for the current mask position
const isValidCharForPosition = (char: string, position: number): boolean => {
  if (!props.mask) return true;

  // Find the next token position in the mask
  let tokenPos = position;
  while (tokenPos < props.mask.length) {
    const maskChar = props.mask[tokenPos];
    const token = props.tokens[maskChar];
    if (token) {
      return token.pattern.test(char);
    }
    tokenPos++;
  }

  return false;
};

// Count total number of token positions in the mask
const getMaxInputLength = (): number => {
  if (!props.mask) return Infinity;

  let count = 0;
  for (let i = 0; i < props.mask.length; i++) {
    const maskChar = props.mask[i];
    if (props.tokens[maskChar]) {
      count++;
    }
  }
  return count;
};

// Handle beforeinput to prevent invalid characters from appearing
const handleBeforeInput = (event: InputEvent) => {
  if (!props.mask || !event.data) return;

  // Check if mask is already full
  const maxLength = getMaxInputLength();
  const currentLength = unmaskedValue.value.length;

  if (currentLength >= maxLength) {
    event.preventDefault();
    return;
  }

  // Get the character being typed
  const char = event.data;

  // Check if any character in the input data is valid
  let hasValidChar = false;
  for (let i = 0; i < char.length; i++) {
    if (isValidCharForPosition(char[i], unmaskedValue.value.length)) {
      hasValidChar = true;
      break;
    }
  }

  // If no valid characters, prevent the input
  if (!hasValidChar) {
    event.preventDefault();
  }
};

// Handle input events
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const cursorPosition = target.selectionStart || 0;
  const newValue = target.value;

  // Extract only valid characters from the input
  let inputOnly = "";
  if (props.mask) {
    // Go through the new value and extract only characters that match token patterns
    for (let i = 0; i < newValue.length; i++) {
      const char = newValue[i];
      // Check if this character matches any token pattern
      let isValid = false;
      for (const tokenKey in props.tokens) {
        const token = props.tokens[tokenKey];
        if (token.pattern.test(char)) {
          isValid = true;
          inputOnly += char;
          break;
        }
      }
      // If not valid and not a literal in the mask, skip it
      if (!isValid) {
        // Check if it's a literal character in the mask
        const isLiteral = props.mask.includes(char) && !props.tokens[char];
        if (!isLiteral) {
          // Invalid character, skip it
          continue;
        }
        // It's a literal, skip it (we'll add it back in applyMask)
      }
    }
  } else {
    inputOnly = newValue;
  }

  // Apply mask
  const masked = applyMask(inputOnly);
  displayValue.value = masked;

  // Update model with unmasked value
  model.value = unmaskedValue.value;

  // Calculate new cursor position
  requestAnimationFrame(() => {
    if (inputRef.value) {
      // Count how many valid characters were before the cursor
      let validCharsBeforeCursor = 0;
      for (let i = 0; i < Math.min(cursorPosition, newValue.length); i++) {
        const char = newValue[i];
        for (const tokenKey in props.tokens) {
          if (props.tokens[tokenKey].pattern.test(char)) {
            validCharsBeforeCursor++;
            break;
          }
        }
      }

      // Find where to place cursor in masked value
      let newCursorPos = 0;
      let validCharsFound = 0;
      for (let i = 0; i < masked.length; i++) {
        if (validCharsFound >= validCharsBeforeCursor) {
          newCursorPos = i;
          break;
        }
        const maskChar = props.mask?.[i];
        if (maskChar && props.tokens[maskChar]) {
          validCharsFound++;
        }
        newCursorPos = i + 1;
      }

      inputRef.value.setSelectionRange(newCursorPos, newCursorPos);
    }
  });
};

// Initialize display value from model
watch(
  () => model.value,
  (newValue) => {
    if (newValue !== unmaskedValue.value) {
      displayValue.value = applyMask(newValue || "");
    }
  },
  { immediate: true },
);

const ariaDescribedBy = computed(() => {
  const ids: string[] = [];
  ids.push(context.helpId.value);
  if (context.invalid.value) {
    ids.push(context.errorId.value);
  }
  return ids.length > 0 ? ids.join(" ") : undefined;
});
</script>

<template>
  <input
    :id="context.id.value"
    ref="inputRef"
    :value="displayValue"
    type="text"
    class="form-control col-12 p-space-xs"
    :class="
      cn(
        {
          'is-invalid': context.invalid.value,
        },
        props.class,
      )
    "
    :placeholder="placeholder"
    :required="context.required.value"
    :disabled="context.disabled.value"
    :readonly="readonly"
    :autocomplete="autocomplete"
    :aria-required="context.required.value"
    :aria-invalid="context.invalid.value ? 'true' : undefined"
    :aria-describedby="ariaDescribedBy"
    @beforeinput="handleBeforeInput"
    @input="handleInput"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
  />
</template>
