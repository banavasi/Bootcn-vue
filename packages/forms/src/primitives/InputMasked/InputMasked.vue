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

// Handle input events
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const cursorPosition = target.selectionStart || 0;
  const newValue = target.value;

  // Get only the input characters (remove literals from pasted content)
  let inputOnly = "";
  if (props.mask) {
    for (let i = 0; i < newValue.length; i++) {
      const char = newValue[i];
      const maskChar = props.mask[i];
      const token = props.tokens[maskChar];
      if (token && token.pattern.test(char)) {
        inputOnly += char;
      } else if (!maskChar || !token) {
        // Skip literals
        continue;
      } else {
        inputOnly += char;
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

  // Restore cursor position
  requestAnimationFrame(() => {
    if (inputRef.value) {
      let newCursorPos = cursorPosition;
      // Adjust cursor if we're on a literal character
      if (props.mask && masked[newCursorPos - 1]) {
        const maskChar = props.mask[newCursorPos - 1];
        if (maskChar && !props.tokens[maskChar]) {
          // We just added a literal, move cursor forward
          newCursorPos++;
        }
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
    @input="handleInput"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
  />
</template>
