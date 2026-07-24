'use client'

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

/** One tab in a `Tabs` tablist (DESIGN-SPEC §5.9). */
export interface TabItem {
  readonly id: string
  readonly label: string
  readonly content: ReactNode
}

/**
 * Accessible tabs (ARIA tabs pattern, docs/37): `role="tablist"`, roving
 * tabindex, and arrow-key navigation between tabs.
 */
export function Tabs({ items }: { items: readonly TabItem[] }) {
  const [active, setActive] = useState(items[0]?.id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  if (items.length === 0) return null

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const nextIndex =
      event.key === 'ArrowRight' ? (index + 1) % items.length : (index - 1 + items.length) % items.length
    const next = items[nextIndex]
    if (!next) return
    setActive(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Tool sections"
        className="flex gap-6 border-b border-gray-200 dark:border-gray-700"
      >
        {items.map((item, index) => {
          const selected = item.id === active
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el
              }}
              role="tab"
              type="button"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={
                selected
                  ? 'border-b-2 border-primary px-1 pb-3 font-medium text-primary'
                  : 'px-1 pb-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={item.id !== active}
          className="pt-6"
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
