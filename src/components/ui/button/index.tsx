import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import style from "./style.module.css";
import { JSX } from "solid-js";

const buttonStyles = cva(style.button, {
  variants: {
    variant: {
      default: style.default,
      destructive: style.destructive,
      ghost: style.ghost,
      primary: style.primary,
      secondary: style.secondary,
    },
    modifiers: {
      border: style.mod__border,
      disabled: style.mod__disabled,
    },
    size: {
      icon: style.size__icon,
      small: style.size__small,
      regular: style.size__medium,
      large: style.size__large,
    },
  },
})

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonStyles> {
  className?: string;
}

export default function Button({
  className,
  children,
  variant,
  modifiers,
  size,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button class={buttonStyles({ className, variant, modifiers, size })} {...props}>
      {children}
    </button>
  )
}
