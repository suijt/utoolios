/**
 * UToolios design tokens — the single source of visual truth (docs/10 §6,
 * `design/02-colors.md`).
 *
 * Color history (2026-07-24): v1 (#2563EB/#06B6D4/#8B5CF6) -> v2 rebrand
 * (#7C3AED/#F59E0B) -> v3 (#1B51FD) -> reverted back to v1 values, per
 * explicit user confirmation after conflicting AI-generated design prompts.
 * These v1 values are the current source of truth — see `design/02-colors.md §5`.
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

  // Neutral (slate scale, full)
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',
} as const

export const brand = {
  name: 'UToolios',
  domain: 'utoolios.com',
  tagline: 'Thousands of free online tools. One trusted platform.',
  heroHeadline: 'Find the right tool for any task.',
} as const

export type ColorToken = keyof typeof colors
