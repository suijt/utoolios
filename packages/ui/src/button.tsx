import type { ButtonHTMLAttributes } from 'react'

/** Shared button variants (DESIGN-SPEC §5.1). */
export type ButtonVariant = 'primary' | 'gradient' | 'secondary'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  gradient: 'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90',
  secondary: 'border border-gray-300 hover:border-primary dark:border-gray-600',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/30 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}
