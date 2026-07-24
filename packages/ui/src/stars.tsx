/**
 * Rating stars (DESIGN-SPEC §5.7). Built for when a real rating source exists —
 * DO NOT render this anywhere yet (honesty rule §0: we have 0 reviews).
 */
export function Stars({ value, count }: { value: number; count: number }) {
  const rounded = Math.round(value * 2) / 2
  const full = Math.floor(rounded)
  const half = rounded % 1 !== 0

  return (
    <span className="inline-flex items-center gap-1 text-sm text-gray-500">
      <span aria-hidden="true" className="text-warning">
        {'★'.repeat(full)}
        {half ? '½' : ''}
      </span>
      <span>
        {value.toFixed(1)} ({count.toLocaleString()})
      </span>
    </span>
  )
}
