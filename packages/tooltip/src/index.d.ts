import type { Component } from "vue";

export { default as Tooltip } from "./Tooltip.vue";
export { default as TooltipTrigger } from "./TooltipTrigger.vue";
export { default as TooltipContent } from "./TooltipContent.vue";

// Re-export TooltipProvider from reka-ui
export const TooltipProvider: Component;

// Re-export types from reka-ui
export type {
  TooltipRootProps,
  TooltipRootEmits,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipContentEmits,
  TooltipProviderProps,
} from "reka-ui";
