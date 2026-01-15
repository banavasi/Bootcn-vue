<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, ref, watchEffect } from "vue";
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from "reka-ui";
import { cn } from "@bootcn-vue/core";
import { InputRoot, InputLabel, InputError, InputHelp } from "@bootcn-vue/forms";
import { radioVariants, type RadioVariants } from ".";
import "./radio.scss";

/** Option can be a simple value or an object with value and label */
export interface RadioOption {
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
  /** Array of options to render */
  options: RadioOption[];
  /** v-model binding */
  modelValue?: string | number;
  /** Spacing between radio items */
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Radio button variant */
  variant?: RadioVariants["variant"];
  /** Radio button size */
  size?: RadioVariants["size"];
  /** Disable the entire group */
  disabled?: boolean;
  /** Mark field as required */
  required?: boolean;
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
  /** CSS class for the root container */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
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
  "update:modelValue": [value: string | number | undefined];
}>();

// Use ref for internal value to work with Reka UI's v-model
const internalValue = ref<string | undefined>(
  props.modelValue !== undefined ? String(props.modelValue) : undefined,
);

// Sync internal value with prop changes
watchEffect(() => {
  internalValue.value = props.modelValue !== undefined ? String(props.modelValue) : undefined;
});

// Emit changes from Reka UI back to parent
const handleUpdate = (value: string | undefined) => {
  if (value === undefined) {
    emit("update:modelValue", undefined);
  } else {
    // Try to preserve the original type from options
    const option = props.options.find((opt) => String(opt.value) === value);
    emit("update:modelValue", option ? option.value : value);
  }
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

// Check if specific option is disabled
const isOptionDisabled = (option: RadioOption) => {
  return props.disabled || option.disabled;
};
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

    <!-- Radio Group -->
    <RadioGroupRoot
      :id="props.id"
      v-model="internalValue"
      :class="cn('d-flex flex-column', spacingClass)"
      :disabled="props.disabled"
      data-slot="radio-group"
      @update:model-value="handleUpdate"
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
        data-slot="radio-group-item"
      >
        <RadioGroupItem
          :value="String(option.value)"
          :disabled="isOptionDisabled(option)"
          :class="
            cn(
              'radio-base',
              radioVariants({ variant: props.variant, size: props.size }),
              isOptionDisabled(option) && 'opacity-50 cursor-not-allowed',
            )
          "
          data-slot="radio"
        >
          <RadioGroupIndicator as-child>
            <span class="radio-indicator" />
          </RadioGroupIndicator>
        </RadioGroupItem>
        <span>{{ option.label }}</span>
      </label>
    </RadioGroupRoot>

    <!-- Help Text -->
    <InputHelp v-if="props.helpText">{{ props.helpText }}</InputHelp>

    <!-- Error Message -->
    <InputError v-if="props.error">{{ props.error }}</InputError>
  </InputRoot>
</template>
