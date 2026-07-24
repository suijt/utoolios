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
            <div key={line.label} className={line.wide ? 'col-span-full' : undefined}>
              <dt className="text-sm opacity-80">{line.label}</dt>
              {line.wide ? (
                <dd className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-black/10 p-3 font-mono text-xs leading-relaxed dark:bg-black/20">
                  {line.value}
                </dd>
              ) : (
                <dd className="font-semibold">{line.value}</dd>
              )}
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
