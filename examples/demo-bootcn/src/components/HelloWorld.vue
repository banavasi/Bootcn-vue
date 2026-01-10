<script setup lang="ts">
import { Button } from "@/components/ui/Button";
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <Button asChild variant="primary"
        ><a href="https://vite.dev/" target="_blank" rel="noopener">Vite sdsfadsf</a></Button
      >
    </h3>

    <Button variant="secondary">Secondary Button</Button>
  </div>
</template>
