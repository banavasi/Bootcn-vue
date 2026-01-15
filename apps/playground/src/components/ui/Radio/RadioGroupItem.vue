<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { inject, computed } from "vue";
import type { ComputedRef } from "vue";
import { RadioGroupItem, RadioGroupIndicator } from "reka-ui";
import { cn } from "@bootcn-vue/core";
import { radioVariants, type RadioVariants } from ".";
import "./radio.scss";

interface Props {
  value: string | number;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

interface RadioGroupContext {
  variant: ComputedRef<RadioVariants["variant"]>;
  size: ComputedRef<RadioVariants["size"]>;
  disabled: ComputedRef<boolean>;
}

const group = inject<RadioGroupContext>("radioGroup");

const isDisabled = computed(() => props.disabled || group?.disabled.value);
</script>

<template>
  <label
    :class="
      cn(
        'd-flex align-items-center gap-2 user-select-none',
        !isDisabled && 'cursor-pointer',
        props.class,
      )
    "
    data-slot="radio-group-item"
  >
    <RadioGroupItem
      :value="String(props.value)"
      :disabled="isDisabled"
      :class="
        cn(
          'radio-base',
          radioVariants({ variant: group?.variant.value, size: group?.size.value }),
          isDisabled && 'opacity-50 cursor-not-allowed',
        )
      "
      data-slot="radio"
    >
      <RadioGroupIndicator as-child>
        <span class="radio-indicator" />
      </RadioGroupIndicator>
    </RadioGroupItem>
    <span><slot /></span>
  </label>
</template>
