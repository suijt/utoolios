'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@utoolios/ui'

export interface SearchItem {
  id: string
  title: string
  summary: string
  path: string
}

/** Instant client-side tool search for the homepage hero (docs/32 Phase 1 static index). */
export function ToolSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const matches =
    q === ''
      ? []
      : items
          .filter((item) => `${item.title} ${item.summary}`.toLowerCase().includes(q))
          .slice(0, 6)

  return (
    <form
      className="relative mt-8 max-w-xl"
      onSubmit={(event) => {
        event.preventDefault()
        if (matches[0]) router.push(matches[0].path)
      }}
    >
      <label htmlFor="tool-search" className="sr-only">
        Search tools
      </label>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        id="tool-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search tools… (e.g. mortgage calculator, JSON formatter)"
        className="w-full rounded-full border border-gray-300 bg-white py-4 pl-12 pr-4 text-base shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-gray-600 dark:bg-gray-800 sm:pr-32"
      />
      <Button type="submit" className="absolute right-1.5 top-1.5 hidden sm:inline-flex">
        Search
      </Button>
      {matches.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-card border border-gray-200 bg-white text-left shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {matches.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="block px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="font-medium">{item.title}</span>
                <span className="block truncate text-sm text-gray-500">{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
