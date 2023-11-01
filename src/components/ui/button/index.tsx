import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import style from "./style.module.css";
import { JSX } from "solid-js";

const buttonStyles = cva(style.button, {
  variants: {
    variant: {
      default: cx(style.default),
      primary: cx(style.primary),
      secondary: cx(style.secondary),
    },
    border: {
      true: cx(style.border)
    },
  },
  defaultVariants: {
    variant: "default",
    border: false,
  }
})

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonStyles> {
  className?: string;
}

export default function Button({
  className,
  children,
  variant,
  border,
  ...props
}: ButtonProps) {
  return (
    <button class={buttonStyles({ className, variant, border })} {...props}>
      {children}
    </button>
  )
}
