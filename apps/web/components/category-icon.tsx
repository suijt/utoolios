import type { ToolCategory } from '@utoolios/core'

/**
 * Category icons + color tiles, recreated from the brand icon set in /brand.
 * Class strings are literal (not built dynamically) so Tailwind keeps them.
 */
const META: Record<ToolCategory, { tile: string; fg: string; label: string; glyph: JSX.Element }> = {
  finance: {
    tile: 'bg-success/10',
    fg: 'text-success',
    label: 'Finance',
    glyph: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="12" x2="8" y2="12" />
        <line x1="12" y1="12" x2="12" y2="12" />
        <line x1="16" y1="12" x2="16" y2="12" />
      </>
    ),
  },
  developer: {
    tile: 'bg-accent/10',
    fg: 'text-accent',
    label: 'Developer',
    glyph: (
      <>
        <path d="M8 6l-5 6 5 6" />
        <path d="M16 6l5 6-5 6" />
      </>
    ),
  },
  health: {
    tile: 'bg-error/10',
    fg: 'text-error',
    label: 'Health',
    glyph: <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />,
  },
  text: {
    tile: 'bg-primary/10',
    fg: 'text-primary',
    label: 'Text',
    glyph: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="13" y2="16" />
      </>
    ),
  },
  home: {
    tile: 'bg-warning/10',
    fg: 'text-warning',
    label: 'Home',
    glyph: (
      <>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
      </>
    ),
  },
}

export function categoryLabel(category: ToolCategory): string {
  return META[category].label
}

export function CategoryIcon({ category, size = 40 }: { category: ToolCategory; size?: number }) {
  const meta = META[category]
  return (
    <span
      className={`inline-flex items-center justify-center rounded-card ${meta.tile} ${meta.fg}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {meta.glyph}
      </svg>
    </span>
  )
}
