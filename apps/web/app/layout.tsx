import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { Gift, Lock, RefreshCw, Search, Smartphone, Target, UserCheck } from 'lucide-react'
import { Container } from '@utoolios/ui'
import { getAllCategories } from '@utoolios/tools'
import { categoryPath } from '@utoolios/engine'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { MobileNav } from '@/components/mobile-nav'
import { categoryLabel } from '@/components/category-icon'
import './globals.css'

/**
 * Three fonts, three jobs (`design/03-typography.md`): Inter is the ambient
 * default everywhere; Geist is reserved for the hero headline + stat numbers
 * only; JetBrains Mono is for code/JSON/JWT contexts.
 */
const inter = Inter({ subsets: ['latin'], display: 'swap' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

/** All true statements about the platform today — no fabricated claims (honesty rule). */
const VALUE_PROPS = [
  { icon: Gift, title: 'Always Free', description: 'All tools are 100% free to use forever.' },
  { icon: UserCheck, title: 'No Sign Up', description: 'No registration required. Jump right in.' },
  { icon: Lock, title: 'Privacy First', description: 'We collect no personal data from tool usage.' },
  { icon: Smartphone, title: 'Mobile Friendly', description: 'Works perfectly on all devices.' },
  { icon: Target, title: 'Accurate Results', description: 'Every calculation is covered by tests.' },
  { icon: RefreshCw, title: 'Regular Updates', description: 'New tools added frequently.' },
]

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
  const categories = getAllCategories()

  return (
    <html lang="en" className={`${inter.className} ${GeistSans.variable} ${jetbrainsMono.variable}`}>
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
          <Container wide>
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
                <Link
                  href="/#tool-search"
                  aria-label="Search tools"
                  className="rounded-btn p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Search size={20} strokeWidth={2} aria-hidden="true" />
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </Container>
        </header>

        <main id="main" className="py-12 pb-24 md:pb-12">
          {children}
        </main>

        <footer className="mb-16 mt-16 border-t border-gray-200 dark:border-gray-700 md:mb-0">
          <div className="border-b border-gray-200 bg-gray-50 py-10 dark:border-gray-700 dark:bg-gray-800/40">
            <Container wide>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {VALUE_PROPS.map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <item.icon size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>

          <div className="py-10">
            <Container wide>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
                <div>
                  <Logo />
                  <p className="mt-3 text-sm text-gray-500">
                    Thousands of free online tools. One trusted platform.
                  </p>
                </div>
                {categories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">Categories</h3>
                    <ul className="mt-3 space-y-2 text-sm text-gray-500">
                      {categories.map((category) => (
                        <li key={category}>
                          <Link href={categoryPath(category)} className="hover:text-primary dark:hover:text-secondary">
                            {categoryLabel(category)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Container>
          </div>
        </footer>

        <MobileNav />
      </body>
    </html>
  )
}
