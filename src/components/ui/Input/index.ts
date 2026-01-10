import { cva, type VariantProps } from "class-variance-authority";

export { default as Input } from "./Input.vue";

export const inputVariants = cva("form-control", {
  variants: {
    size: {
      sm: "form-control-sm",
      md: "",
      lg: "form-control-lg",
    },
    state: {
      default: "",
      valid: "is-valid",
      invalid: "is-invalid",
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
