import type { ReactNode } from 'react'

/**
 * Centered content container with consistent max width and padding. Tool and
 * article pages use the default `max-w-3xl` for readability; the homepage
 * (and header/footer, which share its width) opt into `wide` for `max-w-5xl`
 * (DESIGN-SPEC §4).
 */
export function Container({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={`mx-auto w-full px-4 sm:px-6 ${wide ? 'max-w-5xl' : 'max-w-3xl'}`}>{children}</div>
}
