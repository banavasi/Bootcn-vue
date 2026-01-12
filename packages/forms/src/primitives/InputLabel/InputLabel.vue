<script setup lang="ts">
import { inject } from "vue";
import type { VNode } from "vue";
import { INPUT_INJECTION_KEY } from "../types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@bootcn-vue/tooltip";

interface Props {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "small" | "medium" | "large";
  class?: HTMLAttributes["class"];
  tooltipMessage?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
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

const context = inject(INPUT_INJECTION_KEY);
if (!context) {
  throw new Error("InputLabel must be used within InputRoot");
}

const labelClass = `${props.level}-${props.size}`;
</script>

<template>
  <div class="field-label col-12 d-flex align-items-center mb-space-xxs">
    <label :for="context.id.value" class="d-flex fw-bold lh-sm" :class="[labelClass, props.class]">
      <div class="d-flex align-items-center">
        <span class="my-auto">
          <slot />
        </span>

        <!-- Optional Badge (custom slot or default) -->
        <span v-if="isOptional" class="my-auto ms-space-xxs badge bg-light text-dark fs-xs">
          <slot name="optional-badge">
            {{ optionalText }}
          </slot>
        </span>
      </div>
    </label>

    <!-- Tooltip Icon (icon position: before tooltip) -->
    <Tooltip v-if="tooltipMessage" :delay-duration="300">
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
            class="svg-inline--fa fa-circle-info fa-sm my-auto text-dark-1 tooltip-info-icon"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="circle-info"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              class=""
              fill="currentColor"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
            ></path>
          </svg>
        </button>
      </TooltipTrigger>
      <TooltipContent :side="tooltipPosition">
        {{ tooltipMessage }}
      </TooltipContent>
    </Tooltip>
  </div>
</template>
