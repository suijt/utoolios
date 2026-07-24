/**
 * Reserved-height ad placeholder (docs/19, DESIGN-SPEC §5.8) — always renders
 * the same height so an ad loading later never causes layout shift (CLS = 0).
 * Real AdSense wires in behind this abstraction later.
 */
export function AdSlot({ label = 'Advertisement' }: { label?: string }) {
  return (
    <div className="flex h-[90px] items-center justify-center rounded-xl border border-dashed border-gray-300 text-xs text-gray-400 dark:border-gray-700">
      {label}
    </div>
  )
}
