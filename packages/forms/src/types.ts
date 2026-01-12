import type { HTMLAttributes } from "vue";

/**
 * Base props interface for all field components
 * Provides common props for form fields (FieldText, FieldPassword, etc.)
 */
export interface BaseFieldProps {
  /** Unique ID for the input element (required) */
  id: string;

  /** Label text for the field (required for accessibility) */
  label: string;

  /** Heading level for the label (default: h3) */
  labelLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /** Label text size (default: small) */
  labelSize?: "small" | "medium" | "large";

  /** Show label visually (if false, uses visually-hidden class) */
  labelVisible?: boolean;

  /** Placeholder text */
  placeholder?: string;

  /** Mark field as required */
  required?: boolean;

  /** Disable the input */
  disabled?: boolean;

  /** Make input read-only */
  readonly?: boolean;

  /** Error message to display */
  error?: string;

  /** Help text to display below the input */
  helpText?: string;

  /** Tooltip message to display next to the label */
  tooltipMessage?: string;

  /** Show "Optional" badge next to label */
  isOptional?: boolean;

  /** Custom text for optional badge (default: "Optional") */
  optionalText?: string;

  /** CSS class for the root container */
  class?: HTMLAttributes["class"];

  /** CSS class for the input element */
  inputClass?: HTMLAttributes["class"];
}
