import type { ReactNode } from 'react'

/**
 * Centered content container with consistent max width and padding. Tool and
 * article pages use the default `max-w-3xl` for readability; the homepage
 * (and header/footer, which share its width) opt into `wide` for `max-w-7xl`
 * (`design/05-grid.md`).
 */
export function Container({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={`mx-auto w-full px-4 sm:px-6 ${wide ? 'max-w-7xl' : 'max-w-3xl'}`}>{children}</div>
}
