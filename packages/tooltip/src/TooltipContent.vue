<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from "reka-ui";
import { cn } from "@bootcn-vue/core";

defineOptions({
  inheritAttrs: false,
});

interface Props extends /* @vue-ignore */ TooltipContentProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 4,
  side: "top",
});

const emits = defineEmits<TooltipContentEmits>();

// Compute Bootstrap tooltip classes based on side
const tooltipClass = computed(() => {
  const sideClass = {
    top: "bs-tooltip-top",
    right: "bs-tooltip-end",
    bottom: "bs-tooltip-bottom",
    left: "bs-tooltip-start",
  }[props.side || "top"];

  return cn(
    "tooltip",
    sideClass,
    "show", // Always show when mounted
    "animate-in fade-in-0 zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    props.class,
  );
});

// Forward props without class
const forwarded = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...rest } = props;
  return useForwardPropsEmits(rest, emits);
});
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="tooltipClass"
      role="tooltip"
    >
      <div class="tooltip-arrow" />
      <div class="tooltip-inner">
        <slot />
      </div>
    </TooltipContent>
  </TooltipPortal>
</template>
