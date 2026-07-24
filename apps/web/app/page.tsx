import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShieldCheck, UserCheck, Wrench } from 'lucide-react'
import type { ToolCategory } from '@utoolios/core'
import { CategoryTile, Container, StatBar, ToolCard } from '@utoolios/ui'
import { getAllCategories, getAllTools, getToolsByCategory } from '@utoolios/tools'
import { toolPath, categoryPath } from '@utoolios/engine'
import { CategoryIcon, categoryLabel } from '@/components/category-icon'
import { ToolSearch } from '@/components/tool-search'

/** Real categories only, positioned around the hero mark (honesty rule §0 — no fabricated categories). */
const HERO_CHIPS: { category: ToolCategory; className: string }[] = [
  { category: 'finance', className: 'left-0 top-4 -rotate-6' },
  { category: 'developer', className: 'right-2 top-16 rotate-6' },
  { category: 'health', className: 'left-6 bottom-10 rotate-6' },
  { category: 'home', className: 'right-0 bottom-0 -rotate-3' },
]

/**
 * Homepage (DESIGN-SPEC §6.2, brand mockup). Everything is generated from the
 * registry — honesty rule (§0): no fake ratings/usage, real counts only.
 */
export default function HomePage() {
  const categories = getAllCategories()
  const allTools = getAllTools()
  const searchItems = allTools.map((tool) => ({
    id: tool.config.id,
    title: tool.config.title,
    summary: tool.config.summary,
    path: toolPath(tool),
  }))

  const heroChips = HERO_CHIPS.filter((chip) => categories.includes(chip.category))

  return (
    <Container wide>
      {/* Hero */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-8">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Find the right tool for{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              any task
            </span>
            .
          </h1>
          <p className="mt-4 max-w-xl text-lg text-gray-500">
            Calculate, convert, and simplify your everyday life with our free online tools — fast,
            simple, and secure.
          </p>

          <ToolSearch items={searchItems} />

          {allTools.length > 0 && (
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-gray-500">
              <span className="font-medium">🔥 Popular:</span>
              {allTools.map((tool) => (
                <Link
                  key={tool.config.id}
                  href={toolPath(tool)}
                  className="rounded-full border border-gray-200 px-3 py-1 hover:border-primary hover:text-primary dark:border-gray-700 dark:hover:text-secondary"
                >
                  {tool.config.title}
                </Link>
              ))}
            </p>
          )}
        </div>

        {heroChips.length > 0 && (
          <div className="relative hidden h-80 items-center justify-center lg:flex" aria-hidden="true">
            <Image
              src="/brand/icon-mark.png"
              alt=""
              width={220}
              height={243}
              className="drop-shadow-xl"
              priority
            />
            {heroChips.map((chip) => (
              <div key={chip.category} className={`absolute drop-shadow-lg ${chip.className}`}>
                <CategoryIcon category={chip.category} size={56} />
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-10">
        <StatBar
          items={[
            { icon: <Wrench size={24} strokeWidth={2} />, value: String(allTools.length), label: 'Free Tools' },
            { icon: <Heart size={24} strokeWidth={2} />, value: '100%', label: 'Free Forever' },
            { icon: <UserCheck size={24} strokeWidth={2} />, value: 'No Signup', label: 'Required' },
            { icon: <ShieldCheck size={24} strokeWidth={2} />, value: 'Secure', label: '& Private' },
          ]}
        />
      </div>

      {/* Categories */}
      <section id="categories" className="mt-16">
        <h2 className="text-2xl font-bold">Browse by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryTile
              key={category}
              href={categoryPath(category)}
              icon={<CategoryIcon category={category} size={48} />}
              label={categoryLabel(category)}
              count={getToolsByCategory(category).length}
            />
          ))}
        </div>
      </section>

      {/* Popular tools */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold">Popular tools</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allTools.map((tool) => (
            <ToolCard
              key={tool.config.id}
              href={toolPath(tool)}
              icon={<CategoryIcon category={tool.config.category} size={40} />}
              title={tool.config.title}
              categoryLabel={categoryLabel(tool.config.category)}
              summary={tool.config.summary}
            />
          ))}
        </div>
      </section>
    </Container>
  )
}
