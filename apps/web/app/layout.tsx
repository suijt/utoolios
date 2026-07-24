import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import {
  ChevronDown,
  Facebook,
  Gift,
  Heart,
  Instagram,
  Lock,
  RefreshCw,
  Search,
  Smartphone,
  Target,
  Twitter,
  UserCheck,
  Youtube,
} from 'lucide-react'
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

/**
 * Primary nav (`design/10-navigation.md`). Real destinations map to real
 * routes; the browse-oriented links point at the on-page category/tool
 * sections rather than inventing pages that don't exist yet.
 */
const NAV_LINKS: { label: string; href: string; caret?: boolean }[] = [
  { label: 'Tools', href: '/#popular', caret: true },
  { label: 'Categories', href: '/#categories' },
  { label: 'Calculators', href: '/finance' },
  { label: 'Converters', href: '/developer' },
  { label: 'Resources', href: '/#value-props', caret: true },
  { label: 'Blog', href: '/#recently-added' },
  { label: 'About', href: '/#value-props' },
]

const RESOURCE_LINKS = [
  { label: 'Blog', href: '/#recently-added' },
  { label: 'Guides', href: '/#value-props' },
  { label: 'API', href: '/#value-props' },
  { label: 'FAQs', href: '/#value-props' },
]

const COMPANY_LINKS = [
  { label: 'About Us', href: '/#value-props' },
  { label: 'Privacy Policy', href: '/#value-props' },
  { label: 'Terms of Use', href: '/#value-props' },
  { label: 'Disclaimer', href: '/#value-props' },
]

const SOCIAL_LINKS = [
  { label: 'Twitter', icon: Twitter, href: '#' },
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'YouTube', icon: Youtube, href: '#' },
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} ${GeistSans.variable} ${jetbrainsMono.variable}`}
    >
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
              {/* Left: logo */}
              <Link href="/" aria-label="UToolios home" className="shrink-0">
                <Logo />
              </Link>

              {/* Center: plain nav links */}
              <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300 lg:flex">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-1 transition-colors hover:text-primary dark:hover:text-secondary"
                  >
                    {link.label}
                    {link.caret && <ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />}
                  </Link>
                ))}
              </nav>

              {/* Right: search, icons, primary action */}
              <div className="flex items-center gap-2">
                <Link
                  href="/#tool-search"
                  aria-label="Search tools"
                  className="hidden w-56 items-center gap-2 rounded-btn border border-gray-200 bg-gray-50 py-2 pl-3 pr-2 text-sm text-gray-400 transition-colors hover:border-primary dark:border-gray-700 dark:bg-gray-800 xl:flex"
                >
                  <Search size={16} strokeWidth={2} aria-hidden="true" />
                  <span className="flex-1 truncate">Search tools…</span>
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-white">
                    <Search size={13} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </Link>

                <Link
                  href="/#tool-search"
                  aria-label="Search tools"
                  className="rounded-btn p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 xl:hidden"
                >
                  <Search size={20} strokeWidth={2} aria-hidden="true" />
                </Link>

                <ThemeToggle />

                <Link
                  href="/#recently-added"
                  aria-label="Saved & new tools"
                  className="hidden rounded-btn p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 sm:inline-flex"
                >
                  <Heart size={20} strokeWidth={2} aria-hidden="true" />
                </Link>

                <Link
                  href="/#tool-search"
                  className="ml-1 inline-flex items-center rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </Container>
        </header>

        <main id="main" className="py-12 pb-24 md:pb-12">
          {children}
        </main>

        <footer className="mb-16 mt-16 border-t border-gray-200 dark:border-gray-700 md:mb-0">
          {/* Value-prop / trust strip */}
          <div id="value-props" className="border-b border-gray-200 bg-white py-8 dark:border-gray-700 dark:bg-gray-800/40">
            <Container wide>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {VALUE_PROPS.map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-btn bg-primary/10 text-primary">
                      <item.icon size={18} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>

          {/* Link columns */}
          <div className="bg-white py-12 dark:bg-transparent">
            <Container wide>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
                <div>
                  <Logo />
                  <p className="mt-3 max-w-xs text-sm text-gray-500">
                    Thousands of free online tools to simplify your everyday life.
                  </p>
                </div>

                {categories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Categories</h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-gray-500">
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

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Resources</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-gray-500">
                    {RESOURCE_LINKS.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="hover:text-primary dark:hover:text-secondary">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-gray-500">
                    {COMPANY_LINKS.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="hover:text-primary dark:hover:text-secondary">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-700 sm:flex-row">
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} UToolios. All rights reserved.
                </p>
                <div className="flex items-center gap-2">
                  <span className="mr-1 text-sm font-medium text-gray-500">Connect with us</span>
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary hover:text-white dark:bg-gray-800"
                    >
                      <social.icon size={16} strokeWidth={2} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        </footer>

        <MobileNav />
      </body>
    </html>
  )
}
