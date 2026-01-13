<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { InputRoot, InputLabel, InputPassword, InputError, InputHelp } from "@bootcn-vue/forms";

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
}

withDefaults(defineProps<Props>(), {
  labelLevel: "h3",
  labelSize: "small",
  labelVisible: true,
  autocomplete: "current-password",
});

const model = defineModel<string>();
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
    <InputPassword
      v-model="model"
      :placeholder="placeholder"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :class="inputClass"
    >
      <template #helper>
        <slot name="helper" />
      </template>
    </InputPassword>
    <InputHelp v-if="helpText">{{ helpText }}</InputHelp>
    <InputError v-if="error">{{ error }}</InputError>
  </InputRoot>
</template>
