<script setup lang="ts">
import type { HTMLAttributes, VNode } from "vue";
import { computed, inject } from "vue";
// biome-ignore lint/correctness/noUnusedImports: Components are used in Vue template
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@bootcn-vue/tooltip";
import { INPUT_INJECTION_KEY } from "../context";

interface Props {
  /**
   * ID of the input element to associate the label with
   * If provided, this overrides the context id.
   * Required if InputLabel is used without InputRoot context.
   */
  for?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "small" | "medium" | "large";
  class?: HTMLAttributes["class"];
  /**
   * Tooltip message (plain text)
   * Use tooltipHtmlContent for HTML content
   */
  tooltipMessage?: string;
  /**
   * Tooltip HTML content
   * If provided, this takes precedence over tooltipMessage
   */
  tooltipHtmlContent?: string;
  /**
   * Tooltip position
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /**
   * Tooltip background color (Bootstrap class or custom color)
   * Examples: "bg-primary", "bg-danger", "#ff0000"
   */
  tooltipBgColor?: string;
  /**
   * Tooltip text color (Bootstrap class or custom color)
   * Examples: "text-white", "text-dark", "#ffffff"
   */
  tooltipTextColor?: string;
  isOptional?: boolean;
  optionalText?: string;
  iconPosition?: "before" | "after";
}

const props = withDefaults(defineProps<Props>(), {
  level: "h3",
  size: "small",
  optionalText: "Optional",
  tooltipPosition: "top",
  iconPosition: "after",
});

defineSlots<{
  default?: () => VNode[] | undefined;
  icon?: () => VNode[] | undefined;
  "optional-badge"?: () => VNode[] | undefined;
}>();

const context = inject(INPUT_INJECTION_KEY, undefined);

// Validate: either 'for' prop or context must be provided
if (!props.for && !context) {
  throw new Error(
    "InputLabel requires either a 'for' prop or must be used within InputRoot. " +
      "Provide 'for' prop when using with custom components, or wrap in InputRoot for standard inputs.",
  );
}

// Determine the label's 'for' attribute
// Priority: 1. Explicit 'for' prop, 2. Context id
const labelFor = computed(() => {
  if (props.for) {
    return props.for;
  }
  if (context) {
    return context.id.value;
  }
  return undefined;
});

const labelClass = `${props.level}-${props.size}`;
</script>

<template>
  <div class="field-label col-12 d-flex align-items-center mb-space-xxs">
    <label :for="labelFor" class="d-flex fw-bold lh-sm" :class="[labelClass, props.class]">
      <div class="d-flex align-items-center">
        <span class="my-auto">
          <slot />
        </span>

        <!-- Optional Badge (custom slot or default) -->
        <span
          v-if="isOptional"
          class="my-auto ms-space-xxs badge rounded-pill fw-normal"
          style="
            background-color: #e8e8e8;
            color: #484848;
            font-size: 0.75rem;
            padding: 0.25em 0.6em;
          "
        >
          <slot name="optional-badge">
            {{ optionalText }}
          </slot>
        </span>
      </div>
    </label>

    <!-- Tooltip Icon (icon position: before tooltip) -->
    <TooltipProvider v-if="tooltipMessage || tooltipHtmlContent">
      <Tooltip :delay-duration="300">
        <TooltipTrigger as-child>
          <button
            type="button"
            class="btn btn-link p-0"
            :class="iconPosition === 'before' ? 'me-space-xxs order-first' : 'ms-space-xxs'"
            aria-label="More information"
          >
            <!-- Custom Icon Slot -->
            <slot v-if="$slots.icon" name="icon" />

            <!-- Default SVG Icon (fallback) -->
            <svg
              v-else
              width="16"
              height="16"
              class="my-auto text-dark-1 tooltip-info-icon"
              style="vertical-align: middle"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent
          :side="tooltipPosition"
          :html-content="tooltipHtmlContent"
          :bg-color="tooltipBgColor"
          :text-color="tooltipTextColor"
        >
          {{ tooltipMessage }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
