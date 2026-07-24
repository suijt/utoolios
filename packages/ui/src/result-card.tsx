import type { ResultLine } from '@utoolios/core'

/**
 * The result card (docs/02 anatomy) — the signature gradient panel (DESIGN-SPEC
 * §5.10). Renders the primary answer large on a brand gradient, secondary lines
 * below. Accessible: results live in an aria-live region so screen readers
 * announce updates (docs/37).
 */
export function ResultCard({ lines }: { lines: readonly ResultLine[] }) {
  const primary = lines.find((line) => line.primary) ?? lines[0]
  const rest = lines.filter((line) => line !== primary)

  return (
    <div
      aria-live="polite"
      className="rounded-card bg-gradient-to-br from-primary to-accent p-6 text-white"
    >
      {primary && (
        <div>
          <div className="text-sm/relaxed opacity-90">{primary.label}</div>
          <div className="text-4xl font-bold">{primary.value}</div>
        </div>
      )}
      {rest.length > 0 && (
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {rest.map((line) => (
            <div key={line.label}>
              <dt className="text-sm opacity-80">{line.label}</dt>
              <dd className="font-semibold">{line.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
