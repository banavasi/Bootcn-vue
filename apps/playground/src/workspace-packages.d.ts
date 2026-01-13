/**
 * Type declarations for workspace packages
 *
 * These packages are built without TypeScript declarations (dts: false)
 * because Vue SFCs don't work well with tsup dts generation.
 *
 * This file provides basic module declarations to satisfy TypeScript
 * in the playground/Storybook environment.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "@bootcn-vue/forms" {
  const InputField: any;
  const InputLabel: any;
  const InputError: any;
  const InputDescription: any;
  const InputRoot: any;
  const InputHelp: any;
  const InputMasked: any;
  const InputNumericRange: any;
  const InputPassword: any;
  const Label: any;
  const SelectField: any;
  export {
    InputField,
    InputLabel,
    InputError,
    InputDescription,
    InputRoot,
    InputHelp,
    InputMasked,
    InputNumericRange,
    InputPassword,
    Label,
    SelectField,
  };
}

declare module "@bootcn-vue/field-text" {
  const FieldText: any;
  export { FieldText };
}

declare module "@bootcn-vue/field-password" {
  const FieldPassword: any;
  export { FieldPassword };
}

declare module "@bootcn-vue/tooltip" {
  const Tooltip: any;
  const TooltipTrigger: any;
  const TooltipContent: any;
  export { Tooltip, TooltipTrigger, TooltipContent };
}

declare module "@bootcn-vue/buttons" {
  const Button: any;
  const buttonVariants: any;
  type ButtonVariants = any;
  export { Button, buttonVariants, type ButtonVariants };
}

declare module "@bootcn-vue/core" {
  export function cn(...inputs: any[]): string;
  export const cva: any;
  export type VariantProps<T> = any;
}
