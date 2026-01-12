export { default as Tooltip } from "./Tooltip.vue";
export { default as TooltipTrigger } from "./TooltipTrigger.vue";
export { default as TooltipContent } from "./TooltipContent.vue";

// Re-export TooltipProvider from reka-ui for app-level setup
export { TooltipProvider } from "reka-ui";

// Re-export types from reka-ui for convenience
export type {
  TooltipRootProps,
  TooltipRootEmits,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipContentEmits,
  TooltipProviderProps,
} from "reka-ui";
