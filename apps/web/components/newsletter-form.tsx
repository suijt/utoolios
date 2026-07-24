'use client'

import { useState } from 'react'
import { Button } from '@utoolios/ui'

/**
 * "Stay Updated" newsletter capture (`design/11-homepage.md`). No backend is
 * wired yet, so we never claim a subscription succeeded against a real list —
 * we only acknowledge the submit locally (honesty rule: no fabricated state).
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      className="mt-4"
      onSubmit={(event) => {
        event.preventDefault()
        if (email.trim() === '') return
        setSubmitted(true)
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="min-w-0 flex-1 rounded-btn border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-gray-700 dark:bg-gray-800"
        />
        <Button type="submit" className="shrink-0 justify-center">
          Subscribe
        </Button>
      </div>
      {submitted && (
        <p className="mt-2 text-sm text-success" role="status">
          Thanks — we&apos;ll be in touch when new tools ship.
        </p>
      )}
    </form>
  )
}
