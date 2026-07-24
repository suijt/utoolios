import type { Config } from 'tailwindcss'
import { colors } from './tokens'

/**
 * Shared Tailwind preset (docs/10 §6, `design/` folder is the visual source of
 * truth for v2). apps/web and packages/ui extend this so the whole platform
 * shares one design system. Dark mode is class-based to support the theme
 * toggle from the brand system.
 */
export const tailwindPreset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.primary,
          hover: colors.primaryHover,
        },
        secondary: colors.secondary,
        accent: colors.accent,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        gray: {
          50: colors.gray50,
          100: colors.gray100,
          200: colors.gray200,
          300: colors.gray300,
          400: colors.gray400,
          500: colors.gray500,
          600: colors.gray600,
          700: colors.gray700,
          800: colors.gray800,
          900: colors.gray900,
        },
      },
      borderRadius: {
        // design/07-cards.md, 06-buttons.md, 08-inputs.md
        card: '20px',
        btn: '14px',
        input: '16px',
        dialog: '28px',
      },
      fontFamily: {
        // design/03-typography.md — Inter stays the ambient default (set via
        // next/font's generated class on <html>); these two are opt-in via
        // font-display / font-mono utilities.
        display: ['var(--font-geist-sans)', 'ui-sans-serif', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
}

export default tailwindPreset
