<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { inject, computed } from "vue";
import type { ComputedRef } from "vue";
import { Checkbox } from ".";
import type { CheckboxVariants } from ".";

interface Props {
  value: string | number;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

interface CheckboxGroupContext {
  modelValue: ComputedRef<Array<string | number>>;
  variant: ComputedRef<CheckboxVariants["variant"]>;
  size: ComputedRef<CheckboxVariants["size"]>;
  disabled: ComputedRef<boolean>;
  updateValue: (value: string | number, checked: boolean) => void;
}

const group = inject<CheckboxGroupContext>("checkboxGroup");

const isChecked = computed(() => {
  return group?.modelValue.value.includes(props.value) ? "Y" : "N";
});

const isDisabled = computed(() => props.disabled || group?.disabled.value);

const handleChange = (newValue: "Y" | "N" | null) => {
  if (group && newValue !== null) {
    group.updateValue(props.value, newValue === "Y");
  }
};
</script>

<template>
  <label
    :class="['d-flex align-items-center gap-2 user-select-none cursor-pointer', props.class]"
    data-slot="checkbox-group-item"
  >
    <Checkbox
      :model-value="isChecked"
      :variant="group?.variant.value"
      :size="group?.size.value"
      :disabled="isDisabled"
      @update:model-value="handleChange"
    />
    <span><slot /></span>
  </label>
</template>
