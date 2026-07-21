import type { Config } from 'tailwindcss'
import { colors } from './tokens'

/**
 * Shared Tailwind preset (docs/10 §6). apps/web and packages/ui extend this so
 * the whole platform shares one design system. Dark mode is class-based to
 * support the theme toggle from the brand system.
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
          500: colors.gray500,
          700: colors.gray700,
          900: colors.gray900,
        },
      },
      borderRadius: {
        card: '0.75rem',
      },
    },
  },
}

export default tailwindPreset
