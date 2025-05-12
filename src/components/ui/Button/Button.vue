<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

type Tracker = {
  name: string
  value: string
}

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  tracker?: Tracker
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  asChild: false,
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as-child="props.asChild"
    :as="props.as"
    :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
