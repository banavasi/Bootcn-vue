<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { TooltipArrow, TooltipContent, TooltipPortal, useForwardPropsEmits } from "reka-ui";
import { cn } from "@bootcn-vue/core";
import "./tooltip.css";

defineOptions({
  inheritAttrs: false,
});

interface Props extends /* @vue-ignore */ TooltipContentProps {
  class?: HTMLAttributes["class"];
  /**
   * HTML content to render inside tooltip
   * If provided, this takes precedence over the default slot
   */
  htmlContent?: string;
  /**
   * Background color for the tooltip (Bootstrap class or custom color)
   * Examples: "bg-primary", "bg-danger", "#ff0000"
   */
  bgColor?: string;
  /**
   * Text color for the tooltip (Bootstrap class or custom color)
   * Examples: "text-white", "text-dark", "#ffffff"
   */
  textColor?: string;
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

// Compute tooltip inner classes and styles
const tooltipInnerClass = computed(() => {
  const classes: string[] = ["tooltip-inner"];

  // Add background color class if it's a Bootstrap class
  if (props.bgColor?.startsWith("bg-")) {
    classes.push(props.bgColor);
  }

  // Add text color class if it's a Bootstrap class
  if (props.textColor?.startsWith("text-")) {
    classes.push(props.textColor);
  }

  return cn(...classes);
});

const tooltipInnerStyle = computed(() => {
  const styles: Record<string, string> = {};

  // Add background color if it's a custom color (hex, rgb, etc.)
  if (props.bgColor && !props.bgColor.startsWith("bg-")) {
    styles.backgroundColor = props.bgColor;
  }

  // Add text color if it's a custom color
  if (props.textColor && !props.textColor.startsWith("text-")) {
    styles.color = props.textColor;
  }

  return Object.keys(styles).length > 0 ? styles : undefined;
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
      <TooltipArrow as-child>
        <div class="tooltip-arrow" />
      </TooltipArrow>
      <div :class="tooltipInnerClass" :style="tooltipInnerStyle">
        <!-- Render HTML content if provided -->
        <span v-if="htmlContent" v-html="htmlContent" />
        <!-- Otherwise render default slot -->
        <slot v-else />
      </div>
    </TooltipContent>
  </TooltipPortal>
</template>
