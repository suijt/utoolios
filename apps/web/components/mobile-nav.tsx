'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Grid2x2, House, Menu, Search, X } from 'lucide-react'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

/**
 * Mobile bottom navigation (`design/10-navigation.md §3`). Visible below `md`
 * only — keeps Home/Categories/Search reachable with one thumb, and a Menu
 * sheet for the rest of the nav that's otherwise hidden on small screens.
 */
export function MobileNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const items = [
    { key: 'home', href: '/', label: 'Home', icon: House, active: pathname === '/' },
    { key: 'categories', href: '/#categories', label: 'Categories', icon: Grid2x2, active: false },
    { key: 'search', href: '/#tool-search', label: 'Search', icon: Search, active: false },
  ] as const

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] dark:border-gray-700 dark:bg-gray-900/95 md:hidden"
      >
        <div className="grid grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={`flex flex-col items-center gap-1 py-2.5 text-xs ${
                item.active ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <item.icon size={24} strokeWidth={2} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="flex flex-col items-center gap-1 py-2.5 text-xs text-gray-500 dark:text-gray-400"
          >
            <Menu size={24} strokeWidth={2} aria-hidden="true" />
            Menu
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-[28px] border-t border-gray-200 bg-white p-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] dark:border-gray-700 dark:bg-gray-900 md:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-btn p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={20} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <nav className="mt-6 flex flex-col gap-1 text-base font-medium">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-btn px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Tools
                </Link>
                <Link
                  href="/#categories"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-btn px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Categories
                </Link>
              </nav>
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                <span className="text-sm text-gray-500">Theme</span>
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
