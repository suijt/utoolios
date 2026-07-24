import Link from 'next/link'
import type { ReactNode } from 'react'

export interface CategoryTileProps {
  readonly href: string
  readonly icon: ReactNode
  readonly label: string
  readonly count: number
}

/** Colorful category tile for the homepage grid (DESIGN-SPEC §5.3). Count is always the real registry count. */
export function CategoryTile({ href, icon, label, count }: CategoryTileProps) {
  return (
    <Link
      href={href}
      className="rounded-card border border-gray-200 p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700"
    >
      {icon}
      <h3 className="mt-3 font-semibold">{label}</h3>
      <p className="text-sm text-gray-500">
        {count} tool{count === 1 ? '' : 's'}
      </p>
    </Link>
  )
}
