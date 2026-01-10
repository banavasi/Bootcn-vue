import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'btn',
  {
    variants: {
      variant: {
        // Solid variants (Bootstrap standard)
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        success: 'btn-success',
        danger: 'btn-danger',
        warning: 'btn-warning',
        info: 'btn-info',
        light: 'btn-light',
        dark: 'btn-dark',
        // Outline variants
        'outline-primary': 'btn-outline-primary',
        'outline-secondary': 'btn-outline-secondary',
        'outline-success': 'btn-outline-success',
        'outline-danger': 'btn-outline-danger',
        'outline-warning': 'btn-outline-warning',
        'outline-info': 'btn-outline-info',
        'outline-light': 'btn-outline-light',
        'outline-dark': 'btn-outline-dark',
        // Additional
        link: 'btn-link',
      },
      size: {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>