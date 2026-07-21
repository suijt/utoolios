import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Container } from '@utoolios/ui'
import './globals.css'

/**
 * Root layout — the shared frame every tool renders inside (docs/10 §4).
 * Owns the header, footer, and SEO defaults so tools inherit them automatically.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://utoolios.com'),
  title: {
    default: 'UToolios — Thousands of free online tools',
    template: '%s',
  },
  description: 'Thousands of free online tools for everyday life. Fast, simple, and secure.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <header className="border-b border-gray-200 dark:border-gray-700">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="text-xl font-bold text-primary dark:text-secondary">
                UToolios
              </Link>
              <span className="text-sm text-gray-500">Free online tools</span>
            </div>
          </Container>
        </header>
        <main id="main" className="py-10">
          {children}
        </main>
        <footer className="mt-16 border-t border-gray-200 py-8 dark:border-gray-700">
          <Container>
            <p className="text-sm text-gray-500">
              © UToolios — Thousands of free online tools. One trusted platform.
            </p>
          </Container>
        </footer>
      </body>
    </html>
  )
}
