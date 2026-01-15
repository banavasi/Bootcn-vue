<script setup lang="ts">
import type { HTMLAttributes, CSSProperties } from "vue";
import { computed, ref, watchEffect } from "vue";
import { RadioGroupRoot, RadioGroupItem } from "reka-ui";
import { cn } from "@bootcn-vue/core";
import { InputRoot, InputLabel, InputError, InputHelp } from "@bootcn-vue/forms";
import "./radio-yes-no.css";

interface Props {
  /** Unique ID for the field (required for accessibility) */
  id: string;
  /** Label text for the field (required for accessibility) */
  label: string;
  /** v-model binding */
  modelValue?: "Y" | "N" | null;
  /** Whether the field is required */
  required?: boolean;
  /** Background color for selected state (any valid CSS color) */
  bgColor?: string;
  /** Text color for selected state (any valid CSS color) */
  textColor?: string;
  /** Whether the radio buttons are disabled */
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
  /** Custom label for Yes option */
  yesLabel?: string;
  /** Custom label for No option */
  noLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  required: false,
  bgColor: "#8c1d40", // ASU Maroon from Figma
  textColor: "#ffffff",
  disabled: false,
  labelLevel: "h3",
  labelSize: "small",
  labelVisible: true,
  tooltipPosition: "top",
  yesLabel: "Yes",
  noLabel: "No",
});

const emit = defineEmits<{
  "update:modelValue": [value: "Y" | "N" | null];
}>();

// Computed style for CSS variables - applied inline to each instance
const wrapperStyle = computed<CSSProperties>(
  () =>
    ({
      "--radio-yes-no-bg": props.bgColor,
      "--radio-yes-no-text": props.textColor,
    }) as CSSProperties,
);

// Internal value for Reka UI (uses "yes" / "no" strings)
const internalValue = ref<string | undefined>(undefined);

// Sync props to internal value
watchEffect(() => {
  if (props.modelValue === "Y") {
    internalValue.value = "yes";
  } else if (props.modelValue === "N") {
    internalValue.value = "no";
  } else {
    internalValue.value = undefined;
  }
});

// Handle value changes from Reka UI
const handleUpdate = (value: string | undefined) => {
  if (value === "yes") {
    emit("update:modelValue", "Y");
  } else if (value === "no") {
    emit("update:modelValue", "N");
  } else {
    emit("update:modelValue", null);
  }
};

// Check if a specific option is selected
const isYesSelected = computed(() => internalValue.value === "yes");
const isNoSelected = computed(() => internalValue.value === "no");

// Dynamic classes for selected/unselected states
const getOptionClasses = (isSelected: boolean) => {
  return cn(
    "radio-yes-no-option",
    isSelected && "radio-yes-no-option--selected",
    !isSelected && "radio-yes-no-option--unselected",
    props.disabled && "radio-yes-no-option--disabled",
  );
};

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

    <!-- Radio Group with custom styling -->
    <div :style="wrapperStyle" class="radio-yes-no-wrapper" data-slot="radio-yes-no">
      <RadioGroupRoot
        :id="props.id"
        v-model="internalValue"
        :disabled="disabled"
        class="radio-yes-no-group"
        data-slot="radio-yes-no-group"
        @update:model-value="handleUpdate"
      >
        <!-- Yes Option -->
        <RadioGroupItem
          value="yes"
          :disabled="disabled"
          :class="getOptionClasses(isYesSelected)"
          data-slot="radio-yes-no-item"
        >
          <span class="radio-yes-no-label">{{ yesLabel }}</span>
          <span
            class="radio-yes-no-indicator"
            :class="{ 'radio-yes-no-indicator--selected': isYesSelected }"
          >
            <!-- Checkmark - always rendered, visibility controlled by CSS -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="radio-yes-no-check"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </RadioGroupItem>

        <!-- No Option -->
        <RadioGroupItem
          value="no"
          :disabled="disabled"
          :class="getOptionClasses(isNoSelected)"
          data-slot="radio-yes-no-item"
        >
          <span class="radio-yes-no-label">{{ noLabel }}</span>
          <span
            class="radio-yes-no-indicator"
            :class="{ 'radio-yes-no-indicator--selected': isNoSelected }"
          >
            <!-- Checkmark - always rendered, visibility controlled by CSS -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="radio-yes-no-check"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </RadioGroupItem>
      </RadioGroupRoot>
    </div>

    <!-- Help Text -->
    <InputHelp v-if="props.helpText">{{ props.helpText }}</InputHelp>

    <!-- Error Message -->
    <InputError v-if="props.error">{{ props.error }}</InputError>
  </InputRoot>
</template>
