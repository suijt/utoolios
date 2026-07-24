'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

const MotionLink = motion.create(Link)

export interface CategoryTileProps {
  readonly href: string
  readonly icon: ReactNode
  readonly label: string
  readonly count: number
}

/** Colorful category tile for the homepage grid (`design/07-cards.md`). Count is always the real registry count. */
export function CategoryTile({ href, icon, label, count }: CategoryTileProps) {
  return (
    <MotionLink
      href={href}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className="block rounded-card border border-gray-200 p-5 shadow-sm transition-shadow duration-150 hover:shadow-md dark:border-gray-700"
    >
      {icon}
      <h3 className="mt-3 font-semibold">{label}</h3>
      <p className="text-sm text-gray-500">
        {count} tool{count === 1 ? '' : 's'}
      </p>
    </MotionLink>
  )
}
