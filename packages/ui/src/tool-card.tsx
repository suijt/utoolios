import Link from 'next/link'
import type { ReactNode } from 'react'

export interface ToolCardProps {
  readonly href: string
  readonly icon: ReactNode
  readonly title: string
  readonly categoryLabel: string
  readonly summary: string
}

/**
 * Tool card for popular/listing grids (DESIGN-SPEC §5.4). No rating stars, no
 * "used by" counts — honesty rule (§0): we have 0 users and can't fabricate them.
 */
export function ToolCard({ href, icon, title, categoryLabel, summary }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-card border border-gray-200 p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700"
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <span className="font-semibold">{title}</span>
          <span className="block text-xs uppercase tracking-wide text-gray-400">{categoryLabel}</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-500">{summary}</p>
    </Link>
  )
}
