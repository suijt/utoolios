import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShieldCheck, Sparkles, UserCheck, Wrench } from 'lucide-react'
import type { ToolCategory } from '@utoolios/core'
import { AdSlot, CategoryTile, Container, StatBar, ToolCard } from '@utoolios/ui'
import { getAllCategories, getAllTools, getRecentlyAddedTools, getToolsByCategory } from '@utoolios/tools'
import { toolPath, categoryPath } from '@utoolios/engine'
import { CategoryIcon, categoryLabel } from '@/components/category-icon'
import { ToolSearch } from '@/components/tool-search'

/** Real categories only, positioned around the hero illustration (honesty rule §0 — no fabricated categories). */
const HERO_CHIPS: { category: ToolCategory; className: string }[] = [
  { category: 'finance', className: 'left-0 top-0 -rotate-6' },
  { category: 'developer', className: 'right-4 top-4 rotate-6' },
  { category: 'health', className: 'left-4 bottom-16 rotate-6' },
  { category: 'home', className: 'right-0 bottom-0 -rotate-3' },
]

/** The inner "app window" squares — tinted with our real category colors, not fabricated content. */
const WINDOW_SWATCHES = ['bg-success/20', 'bg-secondary/20', 'bg-error/20', 'bg-primary/20', 'bg-accent/20', 'bg-gray-100 dark:bg-gray-700']

/**
 * Homepage (`design/11-homepage.md`). Everything is generated from the
 * registry — honesty rule: no fake ratings/usage, real counts and dates only.
 */
export default function HomePage() {
  const categories = getAllCategories()
  const allTools = getAllTools()
  const recentTools = getRecentlyAddedTools(5)
  const searchItems = allTools.map((tool) => ({
    id: tool.config.id,
    title: tool.config.title,
    summary: tool.config.summary,
    path: toolPath(tool),
  }))

  const heroChips = HERO_CHIPS.filter((chip) => categories.includes(chip.category))

  return (
    <Container wide>
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:items-start lg:gap-10">
        <div>
          {/* Hero */}
          <section className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-6">
            <div>
              <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                Find the right tool for{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  any task
                </span>
                .
              </h1>
              <p className="mt-4 max-w-xl text-lg text-gray-500">
                Calculate, convert, and simplify your everyday life with our free online tools —
                fast, simple, and secure.
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
              <div className="relative hidden h-72 items-center justify-center lg:flex" aria-hidden="true">
                {/* Abstract app-window illustration — decorative only, no fabricated content */}
                <div className="absolute right-0 top-0 w-56 rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center gap-1.5 border-b border-gray-100 px-4 py-3 dark:border-gray-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-error/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                  </div>
                  <div className="space-y-2.5 p-4">
                    <div className="h-2 w-3/4 rounded-full bg-gray-100 dark:bg-gray-700" />
                    <div className="h-2 w-1/2 rounded-full bg-gray-100 dark:bg-gray-700" />
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {WINDOW_SWATCHES.map((swatch, index) => (
                        <div key={index} className={`h-8 rounded-lg ${swatch}`} />
                      ))}
                    </div>
                  </div>
                </div>

                <Image
                  src="/brand/icon-mark.png"
                  alt=""
                  width={140}
                  height={155}
                  className="absolute bottom-0 left-2 drop-shadow-xl"
                  priority
                />

                {heroChips.map((chip) => (
                  <div key={chip.category} className={`absolute drop-shadow-lg ${chip.className}`}>
                    <CategoryIcon category={chip.category} size={52} />
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
        </div>

        <aside className="mt-10 space-y-6 lg:sticky lg:top-24 lg:mt-0 lg:self-start">
          <AdSlot />

          {recentTools.length > 0 && (
            <div className="rounded-card border border-gray-200 p-5 dark:border-gray-700">
              <h3 className="flex items-center gap-2 font-semibold">
                <Sparkles size={18} className="text-accent" aria-hidden="true" />
                Recently added
              </h3>
              <ul className="mt-4 space-y-3">
                {recentTools.map((tool) => (
                  <li key={tool.config.id}>
                    <Link
                      href={toolPath(tool)}
                      className="flex items-center gap-3 hover:text-primary dark:hover:text-secondary"
                    >
                      <CategoryIcon category={tool.config.category} size={32} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{tool.config.title}</span>
                        <span className="block text-xs text-gray-400">{categoryLabel(tool.config.category)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </Container>
  )
}
