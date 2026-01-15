<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { provide, computed } from "vue";
import { cn } from "@bootcn-vue/core";
import type { CheckboxVariants } from ".";

interface Props {
  modelValue?: Array<string | number>;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: CheckboxVariants["variant"];
  size?: CheckboxVariants["size"];
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  spacing: "sm",
  variant: "rds-dark-3",
  size: "md",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: Array<string | number>];
}>();

// Provide context to child checkboxes
provide("checkboxGroup", {
  modelValue: computed(() => props.modelValue),
  variant: computed(() => props.variant),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  updateValue: (value: string | number, checked: boolean) => {
    const currentValues = [...props.modelValue];
    if (checked) {
      if (!currentValues.includes(value)) {
        emit("update:modelValue", [...currentValues, value]);
      }
    } else {
      emit(
        "update:modelValue",
        currentValues.filter((v) => v !== value),
      );
    }
  },
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
  <div
    :class="cn('d-flex flex-column', spacingClass, props.class)"
    role="group"
    data-slot="checkbox-group"
  >
    <slot />
  </div>
</template>
