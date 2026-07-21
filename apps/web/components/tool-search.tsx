'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface SearchItem {
  id: string
  title: string
  summary: string
  path: string
}

/** Instant client-side tool search for the homepage hero (docs/32 Phase 1 static index). */
export function ToolSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const matches =
    q === ''
      ? []
      : items
          .filter((item) => `${item.title} ${item.summary}`.toLowerCase().includes(q))
          .slice(0, 6)

  return (
    <div className="relative mx-auto mt-8 max-w-xl">
      <label htmlFor="tool-search" className="sr-only">
        Search tools
      </label>
      <input
        id="tool-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search tools… e.g. mortgage calculator, word counter"
        className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-gray-600 dark:bg-gray-800"
      />
      {matches.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-card border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
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
    </div>
  )
}
