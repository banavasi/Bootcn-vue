<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, ref, watchEffect } from "vue";
import { CheckboxRoot, CheckboxIndicator } from "reka-ui";
import type { CheckboxCheckedState } from "reka-ui";
import { InputRoot, InputLabel, InputError, InputHelp } from "@bootcn-vue/forms";
import { type CheckboxVariants, checkboxVariants } from ".";
import { cn } from "@bootcn-vue/core";
import "./checkbox.scss";

interface Props {
  /** Unique ID for the field (required for accessibility) */
  id: string;
  /** Label text for the checkbox (required for accessibility) */
  label: string;
  /** Checked state: Y/N/null */
  modelValue?: "Y" | "N" | null;
  /** Visual variant of the checkbox */
  variant?: CheckboxVariants["variant"];
  /** Size of the checkbox */
  size?: CheckboxVariants["size"];
  /** Whether the checkbox is required */
  required?: boolean;
  /** Disable the checkbox */
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
  /** Help text to display below the checkbox */
  helpText?: string;
  /** Additional CSS classes */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
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
  "update:modelValue": [value: "Y" | "N" | null];
}>();

// Use a ref for the checked state
const checked = ref<CheckboxCheckedState>(false);

// Watch for prop changes and update the ref
watchEffect(() => {
  const newValue = props.modelValue === "Y";
  if (checked.value !== newValue) {
    checked.value = newValue;
  }
});

// Handle changes from the checkbox
const handleCheckedChange = (value: CheckboxCheckedState) => {
  emit("update:modelValue", value === true ? "Y" : "N");
};

// Icon size and stroke width based on checkbox size
const iconSize = computed(() => {
  const sizes: Record<"sm" | "md" | "lg", string> = {
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
  }; // 12px, 16px, 20px
  const size = (props.size ?? "md") as "sm" | "md" | "lg";
  return sizes[size];
});

const strokeWidth = computed(() => {
  const widths: Record<"sm" | "md" | "lg", string> = {
    sm: "2.5",
    md: "3",
    lg: "3.5",
  }; // Thicker strokes
  const size = (props.size ?? "md") as "sm" | "md" | "lg";
  return widths[size];
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

    <!-- Checkbox -->
    <label class="d-flex align-items-center gap-2 user-select-none cursor-pointer">
      <CheckboxRoot
        :id="props.id"
        v-model="checked"
        :disabled="props.disabled"
        :class="
          cn(
            checkboxVariants({ variant: props.variant, size: props.size }),
            props.disabled && 'opacity-50 cursor-not-allowed',
          )
        "
        data-slot="checkbox"
        @update:model-value="handleCheckedChange"
      >
        <CheckboxIndicator class="flex items-center justify-center h-full w-full text-white">
          <slot name="icon">
            <!-- Default SVG checkmark with stroke -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :width="iconSize"
              :height="iconSize"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              :stroke-width="strokeWidth"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" class="check-path" />
            </svg>
          </slot>
        </CheckboxIndicator>
      </CheckboxRoot>
      <span class="checkbox-label-text">
        <slot>{{ props.label }}</slot>
      </span>
    </label>

    <!-- Help Text -->
    <InputHelp v-if="props.helpText">{{ props.helpText }}</InputHelp>

    <!-- Error Message -->
    <InputError v-if="props.error">{{ props.error }}</InputError>
  </InputRoot>
</template>
