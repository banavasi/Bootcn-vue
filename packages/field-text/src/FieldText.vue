<script setup lang="ts">
import { computed } from "vue";
import {
  InputRoot,
  InputLabel,
  InputField,
  InputError,
  InputHelp,
  type BaseFieldProps,
} from "@bootcn-vue/forms";

interface Props extends /* @vue-ignore */ BaseFieldProps {
  /** Input type */
  type?: "text" | "email" | "tel" | "url" | "search";
  /** Autocomplete attribute */
  autocomplete?: string;
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
    :id="id"
    :invalid="invalid"
    :disabled="disabled"
    :required="required"
    :class="props.class"
  >
    <!-- Label always exists for accessibility, use visually-hidden to hide -->
    <InputLabel :level="labelLevel" :size="labelSize" :class="{ 'visually-hidden': !labelVisible }">
      {{ label }}
    </InputLabel>

    <InputField
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :class="inputClass"
    />

    <InputHelp v-if="helpText">{{ helpText }}</InputHelp>

    <InputError v-if="error">{{ error }}</InputError>
  </InputRoot>
</template>
