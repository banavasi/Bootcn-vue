<template>
  <h1>Hello World testing</h1>
  <button @click="count++" :class="['btn', `btn-${props.variant}`]">Count is: {{ count }}</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

const count = ref(0);
const props = defineProps<{
  variant: ButtonVariant;
}>();
</script>
