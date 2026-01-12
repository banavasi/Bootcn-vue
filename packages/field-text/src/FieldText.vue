<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { InputRoot, InputLabel, InputField, InputError, InputHelp } from "@bootcn-vue/forms";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface Props {
  /** Unique ID for the input element (required) */
  id: string;
  /** Label text for the field (required for accessibility) */
  label: string;
  /** Input type */
  type?: "text" | "email" | "tel" | "url" | "search";
  /** Autocomplete attribute */
  autocomplete?: string;
  /** Heading level for the label */
  labelLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Label text size */
  labelSize?: "small" | "medium" | "large";
  /** Show label visually */
  labelVisible?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Mark field as required */
  required?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Make input read-only */
  readonly?: boolean;
  /** Error message to display */
  error?: string;
  /** Help text to display below the input */
  helpText?: string;
  /** Tooltip message to display next to the label */
  tooltipMessage?: string;
  /** Show "Optional" badge next to label */
  isOptional?: boolean;
  /** Custom text for optional badge */
  optionalText?: string;
  /** CSS class for the root container */
  class?: HTMLAttributes["class"];
  /** CSS class for the input element */
  inputClass?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  readonly: false,
  labelVisible: true,
  labelLevel: "h3",
  labelSize: "small",
  type: "text",
});

const model = defineModel<string>();

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
    <!-- Label always exists for accessibility, use visually-hidden to hide -->
    <InputLabel
      :level="props.labelLevel"
      :size="props.labelSize"
      :tooltip-message="props.tooltipMessage"
      :is-optional="props.isOptional"
      :optional-text="props.optionalText"
      :class="{ 'visually-hidden': !props.labelVisible }"
    >
      {{ props.label }}
      <template #icon>
        <FontAwesomeIcon :icon="['fas', 'circle-info']" class="text-dark-1" />
      </template>
    </InputLabel>

    <InputField
      v-model="model"
      :type="props.type"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :autocomplete="props.autocomplete"
      :class="props.inputClass"
    />

    <InputHelp v-if="props.helpText">{{ props.helpText }}</InputHelp>

    <InputError v-if="props.error">{{ props.error }}</InputError>
  </InputRoot>
</template>
