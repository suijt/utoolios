'use client'

import type { ComponentProps } from 'react'
import { motion } from 'framer-motion'

/** Shared button variants (`design/06-buttons.md`). */
export type ButtonVariant = 'primary' | 'gradient' | 'secondary'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  gradient: 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90',
  secondary: 'border border-gray-300 hover:border-primary dark:border-gray-600',
}

export interface ButtonProps extends ComponentProps<typeof motion.button> {
  readonly variant?: ButtonVariant
}

/** Hover/tap durations per `design/15-animations.md`: 100ms hover, 80ms press. */
export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
      className={`inline-flex items-center gap-2 rounded-btn px-5 py-2.5 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}
