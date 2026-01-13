<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { InputRoot, InputLabel, InputMasked, InputError, InputHelp } from "../../primitives";

interface Props {
  id: string;
  label: string;
  modelValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: string;
  helpText?: string;
  tooltipMessage?: string;
  isOptional?: boolean;
  optionalText?: string;
  labelLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  labelSize?: "small" | "medium" | "large";
  labelVisible?: boolean;
  autocomplete?: string;
  inputClass?: HTMLAttributes["class"];
  /**
   * Indicates if the SSN is saved from backend (e.g., "000-00-0000")
   * When true, displays placeholder text and becomes readonly
   */
  isSaved?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  labelLevel: "h3",
  labelSize: "small",
  labelVisible: true,
  autocomplete: "off",
  isSaved: false,
});

const model = defineModel<string>();

// Internal state for handling display vs actual value
const internalValue = computed({
  get() {
    // If saved from backend (e.g., "000-00-0000"), return empty for display
    if (props.isSaved || model.value === "000000000") {
      return "";
    }
    return model.value || "";
  },
  set(value: string) {
    model.value = value;
  },
});

// Placeholder text when saved
const placeholderText = computed(() => {
  if (props.isSaved || model.value === "000000000") {
    return "SSN saved securely";
  }
  return props.placeholder || "123-45-6789";
});

// Make field readonly when saved
const isReadonly = computed(() => {
  return props.readonly || props.isSaved || model.value === "000000000";
});

// Handle input updates
const handleUpdate = (value: string | undefined) => {
  // Only update if not saved
  if (!props.isSaved && model.value !== "000000000") {
    model.value = value;
  }
};
</script>

<template>
  <InputRoot :id="id" :required="required" :disabled="disabled" :invalid="!!error">
    <InputLabel
      :level="labelLevel"
      :size="labelSize"
      :visible="labelVisible"
      :tooltip-message="tooltipMessage"
      :is-optional="isOptional"
      :optional-text="optionalText"
    >
      {{ label }}
    </InputLabel>
    <InputMasked
      :model-value="internalValue"
      mask="###-##-####"
      :placeholder="placeholderText"
      :readonly="isReadonly"
      :autocomplete="autocomplete"
      :class="inputClass"
      @update:model-value="handleUpdate"
    />
    <InputHelp v-if="helpText">{{ helpText }}</InputHelp>
    <InputError v-if="error">{{ error }}</InputError>
  </InputRoot>
</template>
