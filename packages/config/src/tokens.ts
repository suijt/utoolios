/**
 * UToolios design tokens — the single source of visual truth (docs/10 §6,
 * `design/02-colors.md`).
 *
 * v2 rebrand (2026-07-24): secondary/accent changed, warning is now distinct
 * from accent. See `design/02-colors.md §5` for the full migration table.
 *
 * RULE (docs/10): tools consume these tokens, never arbitrary values.
 * Change the brand here in ONE place and all 1000+ tools update.
 */

export const colors = {
  // Brand
  primary: '#2563EB', // Trust / reliability (blue-600)
  primaryHover: '#1D4ED8', // Hover / active (blue-700)
  secondary: '#7C3AED', // Tech / developer identity (violet-600)
  accent: '#F59E0B', // Warmth / signature highlight (amber-500)

  // State
  success: '#10B981', // Growth / progress (emerald-500)
  warning: '#F97316', // Caution (orange-500) — distinct from accent's amber
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
