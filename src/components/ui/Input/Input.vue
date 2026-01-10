<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  type?: "text" | "email" | "number" | "password" | "tel" | "url";
  label?: string;
  labelLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  labelSize?: "small" | "medium" | "large";
  name?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autocomplete?: string;
  class?: HTMLAttributes["class"];
  inputClass?: HTMLAttributes["class"];
  error?: string;
  errors?: string[];
  helpText?: string;
  /** Shows optional badge next to label */
  isOptional?: boolean;
  optionalText?: string;
  /** Show label (default: true) */
  isLabelVisible?: boolean;
  /** Show valid state styling */
  isValid?: boolean;
  /** Tooltip text to show next to label */
  tooltipText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  isOptional: false,
  isLabelVisible: true,
  isValid: false,
  optionalText: "Optional",
  labelLevel: "h3",
  labelSize: "small",
  placeholder: "Enter your text",
  errors: () => [],
});

const emit = defineEmits<{
  blur: [];
  focus: [];
}>();

const model = defineModel<string | number>();

const invalid = computed(() => (props.errors && props.errors.length > 0) || !!props.error);
const computedInvalid = computed(() => (invalid.value ? "true" : undefined));
const errorMessage = computed(() => props.error || (props.errors && props.errors[0]));
const fieldErrorId = computed(() => `${props.id}-error`);
const labelClass = computed(() => `${props.labelLevel}-${props.labelSize}`);

function handleBlur() {
  emit("blur");
}

function handleFocus() {
  emit("focus");
}
</script>

<template>
  <div
    class="field position-relative mb-space-sm"
    :class="cn({ 'is-invalid': invalid }, props.class)"
    data-slot="input-field"
  >
    <!-- Label with optional badge and tooltip -->
    <div class="field-label col-12 d-flex">
      <label
        v-if="label && isLabelVisible"
        :for="id"
        :aria-label="label"
        class="d-flex fw-bold lh-sm"
        :class="labelClass"
      >
        <div class="d-flex mb-space-xs">
          <span class="my-auto">{{ label }}</span>
          <!-- Optional badge -->
          <span
            v-if="isOptional"
            class="my-auto ms-space-xxs ms-lg-space-sm me-lg-space-xs badge bg-light text-dark fs-xs px-space-xxs py-lg-space-xxxs"
          >
            {{ optionalText }}
          </span>
        </div>
      </label>
      <!-- Tooltip slot -->
      <div v-if="tooltipText || $slots.tooltip" class="ms-space-xxs ms-lg-space-sm">
        <slot name="tooltip">
          <span class="text-muted" :title="tooltipText">
            <i class="fa-regular fa-circle-info" />
          </span>
        </slot>
      </div>
    </div>

    <!-- Input wrapper -->
    <div class="position-relative" :class="{ 'is-invalid': invalid }" data-test="input-div">
      <input
        :id="id"
        v-model.trim="model"
        :type="type"
        class="form-control col-12 p-space-xs"
        :class="
          cn(
            {
              'is-invalid': invalid,
              'is-valid': isValid && !invalid,
            },
            inputClass,
          )
        "
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :aria-required="required"
        :aria-invalid="computedInvalid"
        :aria-describedby="invalid ? fieldErrorId : undefined"
        :autocomplete="autocomplete === 'off' ? 'new-password' : autocomplete || undefined"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <!-- Error icon inside input -->
      <span
        v-if="invalid"
        class="position-absolute top-50 end-0 translate-middle-y me-3 text-danger"
        aria-hidden="true"
      >
        <i class="fa-solid fa-circle-exclamation" />
      </span>
      <!-- Button slot for actions next to input -->
      <slot name="button" />
    </div>

    <!-- Message slot -->
    <div v-if="$slots.message" class="mt-space-xxxs">
      <slot name="message" />
    </div>

    <!-- Help text (hidden when error is shown) -->
    <div v-if="helpText && !invalid" class="form-text mt-space-xxxs">
      {{ helpText }}
    </div>

    <!-- Error message -->
    <div
      v-if="invalid"
      :id="fieldErrorId"
      class="text-danger mt-space-xxxs d-flex align-items-center"
    >
      <i class="fa-solid fa-circle-exclamation me-space-xxs" />
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Form control focus state with RDS styling */
.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(var(--rds-info-rgb, 0, 123, 255), 0.5);
  border-color: var(--rds-info, #007bff);
}

/* Valid state styling with bottom border emphasis */
.is-valid {
  border: 2px solid var(--bs-success, #198754);
  border-bottom-width: 5px;
  background-image: none;
}

/* Invalid state styling with bottom border emphasis */
.is-invalid {
  border-bottom-width: 5px;
}

/* Invalid + Focus state: danger border color and box-shadow */
.is-invalid:focus {
  border-color: var(--bs-danger, #dc3545);
  box-shadow: 0 0 0 0.2rem rgba(var(--bs-danger-rgb, 220, 53, 69), 0.25);
}

/* Invalid + Focus state: blue border color */
.is-invalid input:focus {
  border-color: var(--rds-danger, #dc3545);
}

/* Add padding to input when error icon is present */
.is-invalid input {
  padding-right: 2.5rem;
}

/* Ensure button slot positioning works correctly */
.field .position-relative {
  position: relative;
}
</style>
