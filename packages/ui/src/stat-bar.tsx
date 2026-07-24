import type { ReactNode } from 'react'

export interface StatItem {
  readonly icon: ReactNode
  readonly value: string
  readonly label: string
}

/** Hero stats/trust bar (DESIGN-SPEC §5.5). Values passed in must be real or honest (docs/02 C2). */
export function StatBar({ items }: { items: readonly StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-card bg-gray-50 p-6 dark:bg-gray-800/40 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className="flex justify-center text-primary dark:text-secondary" aria-hidden="true">
            {item.icon}
          </div>
          <div className="mt-1 font-bold">{item.value}</div>
          <div className="text-sm text-gray-500">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
