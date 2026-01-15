<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { CheckboxRoot, CheckboxIndicator } from "reka-ui";
import type { CheckboxCheckedState } from "reka-ui";
import { type CheckboxVariants, checkboxVariants } from ".";
import { cn } from "@bootcn-vue/core";
import "./checkbox.scss";

interface Props {
  modelValue?: "Y" | "N" | null;
  variant?: CheckboxVariants["variant"];
  size?: CheckboxVariants["size"];
  class?: HTMLAttributes["class"];
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  variant: "rds-dark-3",
  size: "md",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: "Y" | "N" | null];
}>();

// Create a computed property with getter/setter for v-model
const checked = computed<CheckboxCheckedState>({
  get: () => props.modelValue === "Y",
  set: (value: CheckboxCheckedState) => {
    emit("update:modelValue", value === true ? "Y" : "N");
  },
});

// Icon size and stroke width based on checkbox size
const iconSize = computed(() => {
  const sizes = { sm: "0.75rem", md: "1rem", lg: "1.25rem" }; // 12px, 16px, 20px
  return sizes[props.size || "md"];
});

const strokeWidth = computed(() => {
  const widths = { sm: "2.5", md: "3", lg: "3.5" }; // Thicker strokes
  return widths[props.size || "md"];
});
</script>

<template>
  <CheckboxRoot
    v-model:checked="checked"
    :disabled="props.disabled"
    :class="
      cn(
        checkboxVariants({ variant: props.variant, size: props.size }),
        props.disabled && 'opacity-50 cursor-not-allowed',
        props.class,
      )
    "
    data-slot="checkbox"
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
</template>
