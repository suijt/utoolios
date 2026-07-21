/**
 * UToolios design tokens — the single source of visual truth (docs/10 §6).
 *
 * Extracted from the brand system in /brand. These map almost 1:1 to Tailwind's
 * default palette by design, so the Tailwind preset stays thin.
 *
 * RULE (docs/10): tools consume these tokens, never arbitrary values.
 * Change the brand here in ONE place and all 1000+ tools update.
 */

export const colors = {
  // Brand
  primary: '#2563EB', // Trust / reliability (blue-600)
  primaryHover: '#1D4ED8', // Hover / active (blue-700)
  secondary: '#06B6D4', // Clarity / tech (cyan-500)
  accent: '#8B5CF6', // Creativity / innovation (violet-500)

  // State
  success: '#10B981', // Growth / progress (emerald-500)
  warning: '#F59E0B', // Highlights (amber-500)
  error: '#EF4444', // Alerts (red-500)

  // Neutral (slate scale)
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray500: '#64748B',
  gray700: '#334155',
  gray900: '#0F172A',
} as const

export const brand = {
  name: 'UToolios',
  domain: 'utoolios.com',
  tagline: 'Thousands of free online tools. One trusted platform.',
  heroHeadline: 'Find the right tool for any task.',
} as const

export type ColorToken = keyof typeof colors
