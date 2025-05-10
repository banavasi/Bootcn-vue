import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'btn',
  {
    variants: {
      variant: {
        default:
          'btn-primary',
        destructive:
          'btn-danger',
        outline:
          'btn-outline',
        secondary:
          'btn-secondary',
        ghost:
          'btn-ghost',
        link: 'btn-link',
      },
      size: {
        default: 'btn-default',
        sm: 'btn-sm',
        lg: 'btn-lg',
        icon: 'btn-icon',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>