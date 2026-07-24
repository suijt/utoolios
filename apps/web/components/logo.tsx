import Image from 'next/image'

/**
 * UToolios logo — the real brand mark from `/brand` (docs/10), not a
 * recreation. The mark's own gradient reads on both light and dark surfaces,
 * so one asset covers both themes.
 */
export function Logo({ withWordmark = true, size = 32 }: { withWordmark?: boolean; size?: number }) {
  return (
    <span className="flex items-center gap-2">
      <Image
        src="/brand/icon-mark.png"
        alt="UToolios"
        width={size}
        height={size}
        className="shrink-0"
        priority
      />
      {withWordmark && (
        <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          UToolios
        </span>
      )}
    </span>
  )
}
