import Image from 'next/image'

/**
 * UToolios logo — the real brand mark from `/brand` (docs/10), not a
 * recreation. The mark's own gradient reads on both light and dark surfaces,
 * so one asset covers both themes.
 */
export function Logo({ withWordmark = true, size = 34 }: { withWordmark?: boolean; size?: number }) {
  return (
    <span className="flex items-center gap-2 leading-none">
      <Image
        src="/brand/icon-mark.png"
        alt="UToolios"
        width={size}
        height={size}
        style={{ width: size, height: 'auto' }}
        className="shrink-0 object-contain"
        priority
      />
      {withWordmark && (
        <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          UToolios
        </span>
      )}
    </span>
  )
}
