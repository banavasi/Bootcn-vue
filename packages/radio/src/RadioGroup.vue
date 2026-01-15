<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { provide, computed, ref, watchEffect } from "vue";
import { RadioGroupRoot } from "reka-ui";
import { cn } from "@bootcn-vue/core";
import type { RadioVariants } from ".";

interface Props {
  modelValue?: string | number;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: RadioVariants["variant"];
  size?: RadioVariants["size"];
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  spacing: "sm",
  variant: "rds-dark-3",
  size: "md",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number | undefined];
}>();

// Use ref for internal value to work with Reka UI's v-model
const internalValue = ref<string | number | undefined>(props.modelValue);

// Sync internal value with prop changes
watchEffect(() => {
  internalValue.value = props.modelValue;
});

// Emit changes from Reka UI back to parent
const handleUpdate = (value: string | number | undefined) => {
  emit("update:modelValue", value);
};

// Provide context to child radio buttons for styling
provide("radioGroup", {
  variant: computed(() => props.variant),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
});

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
</script>

<template>
  <RadioGroupRoot
    v-model="internalValue"
    :class="cn('d-flex flex-column', spacingClass, props.class)"
    :disabled="props.disabled"
    data-slot="radio-group"
    @update:model-value="handleUpdate"
  >
    <slot />
  </RadioGroupRoot>
</template>
