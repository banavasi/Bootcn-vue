<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { inject } from "vue";
import { Tooltip, TooltipTrigger, TooltipContent } from "@bootcn-vue/tooltip";
import { INPUT_INJECTION_KEY } from "../context";

interface Props {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "small" | "medium" | "large";
  class?: HTMLAttributes["class"];
  tooltipMessage?: string;
  isOptional?: boolean;
  optionalText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  level: "h3",
  size: "small",
  optionalText: "Optional",
});

const context = inject(INPUT_INJECTION_KEY);
if (!context) {
  throw new Error("InputLabel must be used within InputRoot");
}

const labelClass = `${props.level}-${props.size}`;
</script>

<template>
  <div class="field-label col-12 d-flex align-items-center mb-space-xxs">
    <label :for="context.id.value" class="d-flex fw-bold lh-sm" :class="[labelClass, props.class]">
      <div class="d-flex">
        <span class="my-auto">
          <slot />
        </span>

        <!-- Optional Badge -->
        <span v-if="isOptional" class="my-auto ms-space-xxs badge bg-light text-dark fs-xs">
          {{ optionalText }}
        </span>
      </div>
    </label>

    <!-- Tooltip Icon -->
    <Tooltip v-if="tooltipMessage" :delay-duration="300">
      <TooltipTrigger as-child>
        <button type="button" class="btn btn-link p-0 ms-space-xxs" aria-label="More information">
          <i class="fa-regular fa-circle-info" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {{ tooltipMessage }}
      </TooltipContent>
    </Tooltip>
  </div>
</template>
