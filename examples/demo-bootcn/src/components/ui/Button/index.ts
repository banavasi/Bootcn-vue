import { cva, type VariantProps } from "@/lib/utils";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva("btn text-decoration-none", {
  variants: {
    variant: {
      // Solid variants (Bootstrap standard)
      primary: "btn-primary text-white",
      secondary: "btn-secondary",
      success: "btn-success text-white",
      danger: "btn-danger text-white",
      warning: "btn-warning text-white",
      info: "btn-info text-white",
      light: "btn-light text-dark",
      dark: "btn-dark text-white",
      // Outline variants
      "outline-primary": "btn-outline-primary",
      "outline-secondary": "btn-outline-secondary",
      "outline-success": "btn-outline-success",
      "outline-danger": "btn-outline-danger",
      "outline-warning": "btn-outline-warning",
      "outline-info": "btn-outline-info",
      "outline-light": "btn-outline-light text-dark",
      "outline-dark": "btn-outline-dark",
      // Additional
      link: "btn-link",
    },
    size: {
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
