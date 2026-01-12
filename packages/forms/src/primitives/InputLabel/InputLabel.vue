<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { inject } from "vue";
import { INPUT_INJECTION_KEY } from "../context";

interface Props {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "small" | "medium" | "large";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  level: "h3",
  size: "small",
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
      <slot />
    </label>
  </div>
</template>
