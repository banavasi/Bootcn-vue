<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, ref, watch, inject } from "vue";
import { cn } from "@bootcn-vue/core";
import { INPUT_INJECTION_KEY } from "../context";

interface Props {
  /**
   * Minimum allowed value
   */
  min?: number;
  /**
   * Maximum allowed value
   */
  max?: number;
  /**
   * Default value when input is empty
   */
  defaultValue?: number;
  /**
   * Allow decimal values
   */
  allowDecimal?: boolean;
  /**
   * Number of decimal places (only used when allowDecimal is true)
   */
  decimalPlaces?: number;
  /**
   * Suffix to display after the value (e.g., "%", "kg", "cm")
   */
  suffix?: string;
  /**
   * Prefix to display before the value (e.g., "$", "€")
   */
  prefix?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Make the input read-only
   */
  readonly?: boolean;
  /**
   * Autocomplete attribute
   */
  autocomplete?: string;
  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  min: undefined,
  max: undefined,
  defaultValue: 0,
  allowDecimal: false,
  decimalPlaces: 2,
  suffix: undefined,
  prefix: undefined,
  placeholder: undefined,
  readonly: false,
  autocomplete: undefined,
});

const emit = defineEmits<{
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const context = inject(INPUT_INJECTION_KEY);
const inputRef = ref<HTMLInputElement>();
const model = defineModel<number | null>();

// Display value includes prefix/suffix for visual presentation
const displayValue = ref("");

// Format number with decimal places
const formatNumber = (num: number): string => {
  if (props.allowDecimal && props.decimalPlaces !== undefined) {
    return num.toFixed(props.decimalPlaces);
  }
  return Math.floor(num).toString();
};

// Parse input string to number
const parseInput = (input: string): number | null => {
  // Remove prefix and suffix
  let clean = input;
  if (props.prefix) {
    clean = clean.replace(props.prefix, "");
  }
  if (props.suffix) {
    clean = clean.replace(props.suffix, "");
  }

  clean = clean.trim();

  if (clean === "" || clean === "-") return null;

  const parsed = props.allowDecimal ? parseFloat(clean) : parseInt(clean, 10);

  if (isNaN(parsed)) return null;

  return parsed;
};

// Clamp value to min/max range
const clampValue = (value: number): number => {
  let clamped = value;

  if (props.min !== undefined && clamped < props.min) {
    clamped = props.min;
  }

  if (props.max !== undefined && clamped > props.max) {
    clamped = props.max;
  }

  return clamped;
};

// Update display value with prefix/suffix
const updateDisplayValue = (value: number | null) => {
  if (value === null) {
    displayValue.value = "";
    return;
  }

  const formatted = formatNumber(value);
  const withPrefix = props.prefix ? `${props.prefix}${formatted}` : formatted;
  const withSuffix = props.suffix ? `${withPrefix}${props.suffix}` : withPrefix;

  displayValue.value = withSuffix;
};

// Handle beforeinput to prevent invalid characters
const handleBeforeInput = (event: InputEvent) => {
  if (!event.data) return;

  const char = event.data;

  // Allow digits
  if (/\d/.test(char)) return;

  // Allow decimal point only if decimals are allowed and not already present
  if (props.allowDecimal && char === ".") {
    const currentValue = displayValue.value || "";
    // Remove prefix/suffix to check for decimal point
    let clean = currentValue;
    if (props.prefix) clean = clean.replace(props.prefix, "");
    if (props.suffix) clean = clean.replace(props.suffix, "");

    if (!clean.includes(".")) {
      return; // Allow the decimal point
    }
  }

  // Allow minus sign only at the start and if min allows negative
  if (char === "-" && (props.min === undefined || props.min < 0)) {
    const cursorPosition = (event.target as HTMLInputElement).selectionStart || 0;
    if (cursorPosition === 0) {
      return;
    }
  }

  // Block all other characters
  event.preventDefault();
};

// Handle input changes
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const inputValue = target.value;

  // Parse the input
  const parsed = parseInput(inputValue);

  if (parsed === null) {
    displayValue.value = inputValue; // Keep whatever user typed during typing
    model.value = null;
    return;
  }

  // Update model with raw number (no clamping during typing)
  model.value = parsed;
  displayValue.value = inputValue; // Keep user's input during typing
};

// Handle blur - apply clamping and formatting
const handleBlur = (event: FocusEvent) => {
  let finalValue = model.value;

  // Apply default value if empty
  if (finalValue === null) {
    finalValue = props.defaultValue;
  }

  // Clamp to range
  finalValue = clampValue(finalValue);

  // Update model and display
  model.value = finalValue;
  updateDisplayValue(finalValue);

  emit("blur", event);
};

// Handle focus - remove prefix/suffix for editing
const handleFocus = (event: FocusEvent) => {
  if (model.value !== null) {
    const formatted = formatNumber(model.value);
    displayValue.value = formatted;
  }

  emit("focus", event);
};

// Initialize display value from model
watch(
  () => model.value,
  (newValue) => {
    // Only update display if input is not focused
    if (document.activeElement !== inputRef.value) {
      updateDisplayValue(newValue);
    }
  },
  { immediate: true },
);

const ariaDescribedBy = computed(() => {
  if (!context) return undefined;
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
    :id="context?.id.value"
    ref="inputRef"
    :value="displayValue"
    type="text"
    inputmode="decimal"
    class="form-control col-12 p-space-xs"
    :class="
      cn(
        {
          'is-invalid': context?.invalid.value,
        },
        props.class,
      )
    "
    :placeholder="placeholder"
    :required="context?.required.value"
    :disabled="context?.disabled.value"
    :readonly="readonly"
    :autocomplete="autocomplete"
    :aria-required="context?.required.value"
    :aria-invalid="context?.invalid.value ? 'true' : undefined"
    :aria-describedby="ariaDescribedBy"
    @beforeinput="handleBeforeInput"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>
