<script setup lang="ts">
import { inject } from "vue";
import { INPUT_INJECTION_KEY } from "../context";

const context = inject(INPUT_INJECTION_KEY);
if (!context) {
  throw new Error("InputHelp must be used within InputRoot");
}
</script>

<template>
  <div v-if="!context.invalid.value" :id="context.helpId.value" class="form-text mt-space-xxxs">
    <slot />
  </div>
</template>
