<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"

interface Props {
  id: string
  type?: "text" | "email" | "number" | "password" | "tel" | "url"
  label?: string
  labelClass?: HTMLAttributes["class"]
  name?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  autocomplete?: string
  class?: HTMLAttributes["class"]
  inputClass?: HTMLAttributes["class"]
  error?: string
  errors?: string[]
  helpText?: string
  /** Shows optional badge next to label */
  optional?: boolean
  optionalText?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  optional: false,
  optionalText: "Optional",
  errors: () => [],
})

const emit = defineEmits<{
  blur: [e: FocusEvent]
  focus: [e: FocusEvent]
}>()

const model = defineModel<string | number>()

const hasError = computed(() => (props.errors && props.errors.length > 0) || !!props.error)
const errorMessage = computed(() => props.error || (props.errors && props.errors[0]))
const fieldErrorId = computed(() => `${props.id}-error`)
const fieldHelpId = computed(() => `${props.id}-help`)

const ariaDescribedby = computed(() => {
  const ids: string[] = []
  if (hasError.value) ids.push(fieldErrorId.value)
  if (props.helpText) ids.push(fieldHelpId.value)
  return ids.length > 0 ? ids.join(" ") : undefined
})

function handleBlur(e: FocusEvent) {
  emit("blur", e)
}

function handleFocus(e: FocusEvent) {
  emit("focus", e)
}
</script>

<template>
  <div
    data-slot="input-field"
    :class="cn('mb-space-sm', props.class)"
  >
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="form-label fw-bold mb-space-xs d-flex align-items-center"
      :class="labelClass"
    >
      <span>{{ label }}</span>
      <span
        v-if="optional"
        class="badge bg-light text-dark ms-space-xxs"
      >
        {{ optionalText }}
      </span>
      <slot name="label-suffix" />
    </label>

    <!-- Input Group (allows for button slot) -->
    <div class="position-relative">
      <input
        :id="id"
        v-model="model"
        data-slot="input"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete === 'off' ? 'new-password' : (autocomplete || undefined)"
        :aria-required="required"
        :aria-invalid="hasError ? 'true' : undefined"
        :aria-describedby="ariaDescribedby"
        :class="cn(
          'form-control',
          {
            'is-invalid': hasError,
          },
          inputClass
        )"
        @blur="handleBlur"
        @focus="handleFocus"
      >
      <!-- Slot for button next to input -->
      <slot name="button" />
    </div>

    <!-- Help Text -->
    <div
      v-if="helpText && !hasError"
      :id="fieldHelpId"
      class="form-text mt-space-xxxs"
    >
      {{ helpText }}
    </div>

    <!-- Message Slot -->
    <div v-if="$slots.message" class="mt-space-xxxs">
      <slot name="message" />
    </div>

    <!-- Error Message -->
    <div
      v-if="hasError"
      :id="fieldErrorId"
      class="invalid-feedback d-block mt-space-xxxs"
    >
      <i class="fa-sharp fa-regular fa-circle-exclamation me-space-xxxs" />
      {{ errorMessage }}
    </div>
  </div>
</template>
