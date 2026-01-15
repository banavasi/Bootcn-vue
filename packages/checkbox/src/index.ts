import { cva, type VariantProps } from "@bootcn-vue/core";

export { default as Checkbox } from "./Checkbox.vue";
export { default as CheckboxGroup } from "./CheckboxGroup.vue";
export { type CheckboxOption } from "./CheckboxGroup.vue";
export { default as CheckboxGroupItem } from "./CheckboxGroupItem.vue";

export const checkboxVariants = cva("checkbox-base border rounded transition-all", {
  variants: {
    variant: {
      // Bootstrap theme colors
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      success: "checkbox-success",
      danger: "checkbox-danger",
      warning: "checkbox-warning",
      info: "checkbox-info",
      dark: "checkbox-dark",
      light: "checkbox-light",
      // RDS colors
      "rds-dark-1": "checkbox-rds-dark-1",
      "rds-dark-2": "checkbox-rds-dark-2",
      "rds-dark-3": "checkbox-rds-dark-3",
      "rds-light-1": "checkbox-rds-light-1",
      "rds-light-2": "checkbox-rds-light-2",
      "rds-light-3": "checkbox-rds-light-3",
      "rds-light-4": "checkbox-rds-light-4",
      "rds-light-5": "checkbox-rds-light-5",
    },
    size: {
      sm: "checkbox-sm", // 16px
      md: "checkbox-md", // 20px
      lg: "checkbox-lg", // 24px
    },
  },
  defaultVariants: {
    variant: "rds-dark-3",
    size: "md",
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
