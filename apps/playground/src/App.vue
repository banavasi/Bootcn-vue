<script setup lang="ts">
import { Button } from "./components/ui/Button";

const handleClick = () => {
  alert("clicked");
};
</script>

<template>
  <Button @click="handleClick">click me</Button>
  <h1>How are you doing today</h1>
</template>

<style scoped></style>
