/**
 * Reserved-height ad placeholder (docs/19, `design/07-cards.md`) — always
 * renders the same minimum height so an ad loading later never causes layout
 * shift (CLS = 0). Styled as a clean card, not a specific advertiser's
 * creative — real AdSense wires in behind this abstraction later.
 */
export function AdSlot({ label = 'Advertisement' }: { label?: string }) {
  return (
    <div className="flex min-h-[160px] flex-col items-center justify-center gap-2 rounded-card border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800/40">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</span>
      <span className="text-sm text-gray-400">Ad space reserved — no layout shift</span>
    </div>
  )
}
