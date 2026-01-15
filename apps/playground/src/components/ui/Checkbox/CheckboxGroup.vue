<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, ref, watchEffect } from "vue";
import { cn } from "@bootcn-vue/core";
import { InputRoot, InputLabel, InputError, InputHelp } from "@bootcn-vue/forms";
import CheckboxPrimitive from "./CheckboxPrimitive.vue";
import type { CheckboxVariants } from ".";

/**
 * Option definition for checkbox items
 */
export interface CheckboxOption {
  /** The value to be used when this option is selected */
  value: string | number;
  /** Display label for the option */
  label: string;
  /** Whether this specific option is disabled */
  disabled?: boolean;
}

interface Props {
  /** Unique ID for the field (required for accessibility) */
  id: string;
  /** Label text for the field (required for accessibility) */
  label: string;
  /** Array of checkbox options to render */
  options: CheckboxOption[];
  /** Selected values (array of values) */
  modelValue?: Array<string | number>;
  /** Whether the field is required */
  required?: boolean;
  /** Spacing between checkboxes */
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Visual variant of checkboxes */
  variant?: CheckboxVariants["variant"];
  /** Size of checkboxes */
  size?: CheckboxVariants["size"];
  /** Disable all checkboxes */
  disabled?: boolean;
  /** Heading level for the label */
  labelLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Label text size */
  labelSize?: "small" | "medium" | "large";
  /** Show label visually */
  labelVisible?: boolean;
  /** Tooltip message (plain text) */
  tooltipMessage?: string;
  /** Tooltip HTML content */
  tooltipHtmlContent?: string;
  /** Tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Tooltip background color */
  tooltipBgColor?: string;
  /** Tooltip text color */
  tooltipTextColor?: string;
  /** Show "Optional" badge next to label */
  isOptional?: boolean;
  /** Custom text for optional badge */
  optionalText?: string;
  /** Error message to display */
  error?: string;
  /** Help text to display below the field */
  helpText?: string;
  /** Additional CSS classes */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  spacing: "sm",
  variant: "rds-dark-3",
  size: "md",
  disabled: false,
  required: false,
  labelLevel: "h3",
  labelSize: "small",
  labelVisible: true,
  tooltipPosition: "top",
});

const emit = defineEmits<{
  "update:modelValue": [value: Array<string | number>];
}>();

// Internal state
const internalValue = ref<Array<string | number>>([...props.modelValue]);

// Sync internal value with prop changes
watchEffect(() => {
  internalValue.value = [...props.modelValue];
});

// Handle checkbox change
const handleChange = (optionValue: string | number, checked: "Y" | "N" | null) => {
  const currentValues = [...internalValue.value];
  if (checked === "Y") {
    if (!currentValues.includes(optionValue)) {
      internalValue.value = [...currentValues, optionValue];
    }
  } else {
    internalValue.value = currentValues.filter((v) => v !== optionValue);
  }
  emit("update:modelValue", internalValue.value);
};

// Check if an option is checked
const isChecked = (optionValue: string | number): "Y" | "N" => {
  return internalValue.value.includes(optionValue) ? "Y" : "N";
};

// Check if an option is disabled
const isOptionDisabled = (option: CheckboxOption): boolean => {
  return props.disabled || option.disabled || false;
};

const spacingClass = computed(() => {
  const spacingMap = {
    xs: "gap-space-xxs", // 8px
    sm: "gap-space-xs", // 16px
    md: "gap-space-sm", // 24px
    lg: "gap-space-md", // 32px
    xl: "gap-space-lg", // 48px
  };
  return spacingMap[props.spacing];
});

const invalid = computed(() => !!props.error);
</script>

<template>
  <InputRoot
    :id="props.id"
    :invalid="invalid"
    :disabled="props.disabled"
    :required="props.required"
    :class="props.class"
  >
    <!-- Label -->
    <InputLabel
      :level="props.labelLevel"
      :size="props.labelSize"
      :tooltip-message="props.tooltipMessage"
      :tooltip-html-content="props.tooltipHtmlContent"
      :tooltip-position="props.tooltipPosition"
      :tooltip-bg-color="props.tooltipBgColor"
      :tooltip-text-color="props.tooltipTextColor"
      :is-optional="props.isOptional"
      :optional-text="props.optionalText"
      :class="{ 'visually-hidden': !props.labelVisible }"
    >
      {{ props.label }}
    </InputLabel>

    <!-- Checkbox Group -->
    <div
      :class="cn('d-flex flex-column', spacingClass)"
      role="group"
      :aria-labelledby="props.id"
      data-slot="checkbox-group"
    >
      <!-- Render options from array -->
      <label
        v-for="option in props.options"
        :key="String(option.value)"
        :class="
          cn(
            'd-flex align-items-center gap-2 user-select-none',
            !isOptionDisabled(option) && 'cursor-pointer',
          )
        "
        data-slot="checkbox-group-item"
      >
        <CheckboxPrimitive
          :model-value="isChecked(option.value)"
          :variant="props.variant"
          :size="props.size"
          :disabled="isOptionDisabled(option)"
          @update:model-value="(val) => handleChange(option.value, val)"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>

    <!-- Help Text -->
    <InputHelp v-if="props.helpText">{{ props.helpText }}</InputHelp>

    <!-- Error Message -->
    <InputError v-if="props.error">{{ props.error }}</InputError>
  </InputRoot>
</template>
