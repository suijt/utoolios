import type { ComponentType } from 'react'
import { Calculator, Code2, FileText, Heart, House, type LucideProps } from 'lucide-react'
import type { ToolCategory } from '@utoolios/core'

/**
 * Category icons + color tiles (`design/09-icons.md`). Lucide is the one icon
 * library — no hand-drawn glyphs. Class strings are literal (not built
 * dynamically) so Tailwind keeps them.
 */
const META: Record<ToolCategory, { tile: string; fg: string; label: string; icon: ComponentType<LucideProps> }> = {
  finance: {
    tile: 'bg-success/10',
    fg: 'text-success',
    label: 'Finance',
    icon: Calculator,
  },
  developer: {
    tile: 'bg-secondary/10',
    fg: 'text-secondary',
    label: 'Developer',
    icon: Code2,
  },
  health: {
    tile: 'bg-error/10',
    fg: 'text-error',
    label: 'Health',
    icon: Heart,
  },
  text: {
    tile: 'bg-primary/10',
    fg: 'text-primary',
    label: 'Text',
    icon: FileText,
  },
  home: {
    tile: 'bg-accent/10',
    fg: 'text-accent',
    label: 'Home',
    icon: House,
  },
}

export function categoryLabel(category: ToolCategory): string {
  return META[category].label
}

export function CategoryIcon({ category, size = 40 }: { category: ToolCategory; size?: number }) {
  const meta = META[category]
  const Icon = meta.icon
  return (
    <span
      className={`inline-flex items-center justify-center rounded-card ${meta.tile} ${meta.fg}`}
      style={{ width: size, height: size }}
    >
      <Icon size={size * 0.55} strokeWidth={2} aria-hidden="true" />
    </span>
  )
}
