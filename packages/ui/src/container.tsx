import type { ReactNode } from 'react'

/** Centered content container with consistent max width and padding. */
export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">{children}</div>
}
