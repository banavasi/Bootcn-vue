import { TooltipProvider as RekaTooltipProvider } from "reka-ui";

export { default as Tooltip } from "./Tooltip.vue";
export { default as TooltipContent } from "./TooltipContent.vue";
export { default as TooltipTrigger } from "./TooltipTrigger.vue";

// Re-export TooltipProvider from reka-ui for app-level setup
export { RekaTooltipProvider as TooltipProvider };

// Re-export types from reka-ui for convenience
export type {
  TooltipContentEmits,
  TooltipContentProps,
  TooltipProviderProps,
  TooltipRootEmits,
  TooltipRootProps,
  TooltipTriggerProps,
} from "reka-ui";
