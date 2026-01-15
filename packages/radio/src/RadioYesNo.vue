<script setup lang="ts">
import type { HTMLAttributes, CSSProperties } from "vue";
import { computed, ref, watchEffect } from "vue";
import { RadioGroupRoot, RadioGroupItem } from "reka-ui";
import { cn } from "@bootcn-vue/core";
import { InputLabel } from "@bootcn-vue/forms";

interface Props {
  /** v-model binding */
  modelValue?: "Y" | "N" | null;
  /** Label text displayed above the radio buttons */
  label?: string;
  /** Unique ID for accessibility */
  id?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Background color for selected state (any valid CSS color) */
  bgColor?: string;
  /** Text color for selected state (any valid CSS color) */
  textColor?: string;
  /** Whether the radio buttons are disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  class?: HTMLAttributes["class"];
  /** Custom label for Yes option */
  yesLabel?: string;
  /** Custom label for No option */
  noLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: undefined,
  id: undefined,
  required: false,
  bgColor: "#8c1d40", // ASU Maroon from Figma
  textColor: "#ffffff",
  disabled: false,
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

// Generate unique ID if not provided
const componentId = computed(
  () => props.id || `radio-yes-no-${Math.random().toString(36).slice(2, 9)}`,
);

// Dynamic classes for selected/unselected states
const getOptionClasses = (isSelected: boolean) => {
  return cn(
    "radio-yes-no-option",
    isSelected && "radio-yes-no-option--selected",
    !isSelected && "radio-yes-no-option--unselected",
    props.disabled && "radio-yes-no-option--disabled",
  );
};
</script>

<template>
  <div
    :style="wrapperStyle"
    :class="cn('radio-yes-no-wrapper', props.class)"
    data-slot="radio-yes-no"
  >
    <!-- Integrated Label -->
    <InputLabel v-if="label" :for="componentId" class="mb-space-xxs">
      {{ label }}
      <span v-if="required" class="text-danger ms-1">*</span>
    </InputLabel>

    <!-- Radio Group -->
    <RadioGroupRoot
      :id="componentId"
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
</template>

<style scoped>
/* Wrapper */
.radio-yes-no-wrapper {
  --radio-yes-no-bg: #8c1d40;
  --radio-yes-no-text: #ffffff;
  display: flex;
  flex-direction: column;
}

/* Radio Group - horizontal layout */
.radio-yes-no-group {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
}

/* Individual option button */
.radio-yes-no-option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  min-width: 5rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  transition:
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.15s ease;
}

/* Focus visible state */
.radio-yes-no-option:focus-visible {
  outline: 2px solid var(--radio-yes-no-bg);
  outline-offset: 2px;
}

/* Hover effect (only when not selected and not disabled) */
.radio-yes-no-option--unselected:hover:not(.radio-yes-no-option--disabled) {
  border-color: var(--radio-yes-no-bg);
  background-color: color-mix(in srgb, var(--radio-yes-no-bg) 2%, transparent);
}

/* Show indicator styling on hover of unselected */
.radio-yes-no-option--unselected:hover:not(.radio-yes-no-option--disabled) .radio-yes-no-indicator {
  border-color: var(--radio-yes-no-bg);
  background-color: color-mix(in srgb, var(--radio-yes-no-bg) 5%, transparent);
}

/* Show checkmark on hover of unselected */
.radio-yes-no-option--unselected:hover:not(.radio-yes-no-option--disabled) .radio-yes-no-check {
  opacity: 1;
  transform: scale(1);
  color: var(--radio-yes-no-bg);
}

/* Active/pressed effect */
.radio-yes-no-option:active:not(.radio-yes-no-option--disabled) {
  transform: scale(0.98);
}

/* Unselected state */
.radio-yes-no-option--unselected {
  background-color: #ffffff;
  color: #212529;
}

/* Selected state - uses CSS variables */
.radio-yes-no-option--selected {
  background-color: var(--radio-yes-no-bg);
  color: var(--radio-yes-no-text);
  border-color: transparent;
}

/* Selected indicator - uses bgColor background with textColor checkmark */
.radio-yes-no-indicator--selected {
  background-color: var(--radio-yes-no-text);
  border-color: var(--radio-yes-no-text);
  color: var(--radio-yes-no-bg);
}

/* Disabled state */
.radio-yes-no-option--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* Circle indicator */
.radio-yes-no-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #dee2e6;
  border-radius: 50%;
  flex-shrink: 0;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

/* Checkmark icon */
.radio-yes-no-check {
  opacity: 0;
  transform: scale(0);
  transition:
    opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Show checkmark when selected */
.radio-yes-no-option--selected .radio-yes-no-check {
  opacity: 1;
  transform: scale(1);
}

/* Label text */
.radio-yes-no-label {
  font-size: 0.9375rem;
  line-height: 1.2;
}

/* Animation for selection */
@keyframes radioYesNoSelect {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.radio-yes-no-option--selected {
  animation: radioYesNoSelect 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
