<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ref, computed, inject, nextTick } from "vue";
import { cn } from "@bootcn-vue/core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { INPUT_INJECTION_KEY } from "../context";

interface Props {
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {});

const context = inject(INPUT_INJECTION_KEY);
if (!context) {
  throw new Error("InputPassword must be used within InputRoot");
}

const model = defineModel<string>();
const showPassword = ref(false);
const inputRef = ref<HTMLInputElement>();

const emit = defineEmits<{
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const computedAutocomplete = computed(() => {
  if (props.autocomplete === "off") {
    return "new-password";
  }
  return props.autocomplete || "current-password";
});

const ariaDescribedBy = computed(() => {
  const ids: string[] = [];
  ids.push(context.helpId.value);
  if (context.invalid.value) {
    ids.push(context.errorId.value);
  }
  return ids.length > 0 ? ids.join(" ") : undefined;
});

const toggleVisibility = () => {
  const input = inputRef.value;
  const cursorPosition = input?.selectionStart;
  showPassword.value = !showPassword.value;
  nextTick(() => {
    if (input && cursorPosition !== null) {
      input.setSelectionRange(cursorPosition, cursorPosition);
    }
  });
};
</script>

<template>
  <div class="input-group">
    <input
      :id="context.id.value"
      ref="inputRef"
      v-model="model"
      :type="showPassword ? 'text' : 'password'"
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
    <button
      type="button"
      class="input-group-text"
      :disabled="context.disabled.value"
      :aria-label="showPassword ? 'Hide password' : 'Show password'"
      @click="toggleVisibility"
    >
      <FontAwesomeIcon :icon="showPassword ? faEyeSlash : faEye" />
      <span class="sr-only">{{ showPassword ? "Hide" : "Show" }} password</span>
    </button>
  </div>
  <div v-if="$slots.helper" class="mt-space-xxs">
    <slot name="helper" />
  </div>
</template>
