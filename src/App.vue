<script setup lang="ts">
import { Button } from './components/ui/Button'

const handleClick = () => {
  alert('clicked')
}
</script>

<template>
  <Button variant="destructive" @click="handleClick">click me</Button>
</template>

<style scoped>

</style>
