/**
 * UToolios logo — the gradient "U" mark (blue → cyan → violet) with sparkles,
 * recreated as inline SVG from the brand assets in /brand. No external asset,
 * scales crisply, and inherits the theme.
 */
export function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="utoolios-u" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="0.5" stopColor="#06B6D4" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path
          d="M8 6 V16 A8 8 0 0 0 24 16 V6"
          stroke="url(#utoolios-u)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* sparkles */}
        <path d="M25 3 l0.9 2.3 2.3 0.9 -2.3 0.9 -0.9 2.3 -0.9 -2.3 -2.3 -0.9 2.3 -0.9 z" fill="#2563EB" />
        <path d="M28.5 8 l0.6 1.5 1.5 0.6 -1.5 0.6 -0.6 1.5 -0.6 -1.5 -1.5 -0.6 1.5 -0.6 z" fill="#F59E0B" />
      </svg>
      {withWordmark && (
        <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          UToolios
        </span>
      )}
    </span>
  )
}
