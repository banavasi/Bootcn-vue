export { default as Tooltip } from "./Tooltip.vue";
export { default as TooltipContent } from "./TooltipContent.vue";
export { default as TooltipTrigger } from "./TooltipTrigger.vue";

// Re-export TooltipProvider and types from reka-ui
export {
  TooltipProvider,
  type TooltipContentEmits,
  type TooltipContentProps,
  type TooltipProviderProps,
  type TooltipRootEmits,
  type TooltipRootProps,
  type TooltipTriggerProps,
} from "reka-ui";
