<script setup lang="ts">
import { inject } from "vue";
import { INPUT_INJECTION_KEY } from "../context";

const context = inject(INPUT_INJECTION_KEY);
if (!context) {
  throw new Error("InputError must be used within InputRoot");
}
</script>

<template>
  <div
    v-if="context.invalid.value"
    :id="context.errorId.value"
    class="text-danger mt-space-xxxs d-flex align-items-center"
  >
    <i class="fa-solid fa-circle-exclamation me-space-xxs" />
    <span><slot /></span>
  </div>
</template>
