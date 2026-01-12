<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, inject } from "vue";
import { cn } from "@bootcn-vue/core";
import { INPUT_INJECTION_KEY } from "../context";
import "./InputField.css";

interface Props {
  type?: "text" | "email" | "tel" | "password" | "number" | "url" | "search";
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  class?: HTMLAttributes["class"];
  hasPrefix?: boolean;
  hasSuffix?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  hasPrefix: false,
  hasSuffix: false,
});

const context = inject(INPUT_INJECTION_KEY);
if (!context) {
  throw new Error("InputField must be used within InputRoot");
}

const model = defineModel<string | number>();

const emit = defineEmits<{
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const computedAutocomplete = computed(() => {
  if (props.autocomplete === "off") {
    return "new-password";
  }
  return props.autocomplete;
});

const ariaDescribedBy = computed(() => {
  const ids: string[] = [];
  // Add help ID if it exists (help text is always shown if provided)
  ids.push(context.helpId.value);
  // Add error ID if invalid
  if (context.invalid.value) {
    ids.push(context.errorId.value);
  }
  return ids.length > 0 ? ids.join(" ") : undefined;
});
</script>

<template>
  <div v-if="hasPrefix || hasSuffix" class="input-group">
    <span v-if="hasPrefix" class="input-group-text">
      <slot name="prefix" />
    </span>
    <input
      :id="context.id.value"
      v-model="model"
      :type="type"
      class="form-control col-12 p-space-xs"
      :class="
        cn(
          {
            'is-invalid': context.invalid.value,
          },
          props.class,
        )
      "
      :placeholder="placeholder"
      :required="context.required.value"
      :disabled="context.disabled.value"
      :readonly="readonly"
      :autocomplete="computedAutocomplete"
      :aria-required="context.required.value"
      :aria-invalid="context.invalid.value ? 'true' : undefined"
      :aria-describedby="ariaDescribedBy"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <span v-if="hasSuffix" class="input-group-text">
      <slot name="suffix" />
    </span>
  </div>
  <input
    v-else
    :id="context.id.value"
    v-model="model"
    :type="type"
    class="form-control col-12 p-space-xs"
    :class="
      cn(
        {
          'is-invalid': context.invalid.value,
        },
        props.class,
      )
    "
    :placeholder="placeholder"
    :required="context.required.value"
    :disabled="context.disabled.value"
    :readonly="readonly"
    :autocomplete="computedAutocomplete"
    :aria-required="context.required.value"
    :aria-invalid="context.invalid.value ? 'true' : undefined"
    :aria-describedby="ariaDescribedBy"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
  />
</template>
