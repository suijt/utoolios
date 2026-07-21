import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { Container } from '@utoolios/ui'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://utoolios.com'),
  title: {
    default: 'UToolios — Thousands of free online tools',
    template: '%s',
  },
  description: 'Thousands of free online tools for everyday life. Fast, simple, and secure.',
}

// No-flash theme init: runs before paint so dark mode never flickers.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80">
          <Container>
            <div className="flex h-16 items-center justify-between gap-4">
              <Link href="/" aria-label="UToolios home">
                <Logo />
              </Link>
              <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300 sm:flex">
                <Link href="/" className="hover:text-primary dark:hover:text-secondary">
                  Tools
                </Link>
                <Link href="/#categories" className="hover:text-primary dark:hover:text-secondary">
                  Categories
                </Link>
              </nav>
              <div className="flex items-center gap-1">
                <ThemeToggle />
              </div>
            </div>
          </Container>
        </header>

        <main id="main" className="py-12">
          {children}
        </main>

        <footer className="mt-16 border-t border-gray-200 py-10 dark:border-gray-700">
          <Container>
            <Logo />
            <p className="mt-3 text-sm text-gray-500">
              Thousands of free online tools. One trusted platform.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              <li>⚡ Fast &amp; Reliable</li>
              <li>🔒 Secure &amp; Private</li>
              <li>📱 Mobile Friendly</li>
              <li>♿ Accessible for Everyone</li>
              <li>🌱 Free Forever</li>
            </ul>
          </Container>
        </footer>
      </body>
    </html>
  )
}
