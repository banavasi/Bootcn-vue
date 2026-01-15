import { cva, type VariantProps } from "@bootcn-vue/core";

export { default as RadioGroup } from "./RadioGroup.vue";
export { default as RadioGroupItem } from "./RadioGroupItem.vue";
export { default as RadioYesNo } from "./RadioYesNo.vue";

export const radioVariants = cva("radio-base border rounded-circle transition-all", {
  variants: {
    variant: {
      // Bootstrap theme colors
      primary: "radio-primary",
      secondary: "radio-secondary",
      success: "radio-success",
      danger: "radio-danger",
      warning: "radio-warning",
      info: "radio-info",
      dark: "radio-dark",
      light: "radio-light",
      // RDS colors
      "rds-dark-1": "radio-rds-dark-1",
      "rds-dark-2": "radio-rds-dark-2",
      "rds-dark-3": "radio-rds-dark-3",
      "rds-light-1": "radio-rds-light-1",
      "rds-light-2": "radio-rds-light-2",
      "rds-light-3": "radio-rds-light-3",
      "rds-light-4": "radio-rds-light-4",
      "rds-light-5": "radio-rds-light-5",
    },
    size: {
      sm: "radio-sm", // 18px
      md: "radio-md", // 24px
      lg: "radio-lg", // 30px
    },
  },
  defaultVariants: {
    variant: "rds-dark-3",
    size: "md",
  },
});

export type RadioVariants = VariantProps<typeof radioVariants>;
