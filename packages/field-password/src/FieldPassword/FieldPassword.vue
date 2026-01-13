<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "@bootcn-vue/core";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
});

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <Primitive v-bind="delegatedProps" :class="cn('fieldpassword', props.class)">
    <slot />
  </Primitive>
</template>
