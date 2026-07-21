import type { ResultLine } from '@utoolios/core'

/**
 * The result card (docs/02 anatomy). Renders the primary answer large and any
 * secondary lines below. Accessible: results live in an aria-live region so
 * screen readers announce updates (docs/37).
 */
export function ResultCard({ lines }: { lines: readonly ResultLine[] }) {
  const primary = lines.find((line) => line.primary)
  const rest = lines.filter((line) => !line.primary)
  return (
    <div
      aria-live="polite"
      className="rounded-card bg-gray-50 p-6 dark:bg-gray-700/40"
    >
      {primary && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-500">{primary.label}</div>
          <div className="text-4xl font-bold text-primary dark:text-secondary">
            {primary.value}
          </div>
        </div>
      )}
      <dl className="grid grid-cols-2 gap-3">
        {rest.map((line) => (
          <div key={line.label}>
            <dt className="text-sm text-gray-500">{line.label}</dt>
            <dd className="text-lg font-semibold">{line.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
