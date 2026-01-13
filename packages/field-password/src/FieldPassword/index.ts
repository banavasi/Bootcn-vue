import { cva, type VariantProps } from "@bootcn-vue/core";

export { default as FieldPassword } from "./FieldPassword.vue";

export const fieldpasswordVariants = cva("fieldpassword", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type FieldPasswordVariants = VariantProps<typeof fieldpasswordVariants>;
