import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Layers, Send, ShieldCheck, Sparkles, UserCheck, Wrench } from 'lucide-react'
import type { ToolCategory } from '@utoolios/core'
import { AdSlot, Container, StatBar, ToolCard } from '@utoolios/ui'
import { getAllCategories, getAllTools, getRecentlyAddedTools, getToolsByCategory } from '@utoolios/tools'
import { toolPath, categoryPath } from '@utoolios/engine'
import { CategoryIcon, categoryLabel } from '@/components/category-icon'
import { ToolSearch } from '@/components/tool-search'
import { NewsletterForm } from '@/components/newsletter-form'

/** Real categories only, positioned around the hero illustration (honesty rule §0 — no fabricated categories). */
const HERO_CHIPS: { category: ToolCategory; className: string }[] = [
  { category: 'finance', className: 'left-0 top-2 -rotate-6' },
  { category: 'developer', className: 'left-6 bottom-6 rotate-3' },
  { category: 'health', className: 'right-2 top-0 rotate-6' },
  { category: 'home', className: 'right-0 bottom-2 -rotate-3' },
]

/** The inner "app window" squares — tinted with our real category colors, not fabricated content. */
const WINDOW_SWATCHES = [
  'bg-success/20',
  'bg-secondary/20',
  'bg-error/20',
  'bg-primary/20',
  'bg-accent/20',
  'bg-warning/20',
  'bg-secondary/20',
  'bg-success/20',
  'bg-error/20',
]

/**
 * Homepage (`design/11-homepage.md`). Everything is generated from the
 * registry — honesty rule: no fake ratings/usage, real counts and dates only.
 */
export default function HomePage() {
  const categories = getAllCategories()
  const allTools = getAllTools()
  const recentTools = getRecentlyAddedTools(5)
  const popularChips = allTools.slice(0, 5)
  const searchItems = allTools.map((tool) => ({
    id: tool.config.id,
    title: tool.config.title,
    summary: tool.config.summary,
    path: toolPath(tool),
  }))

  const heroChips = HERO_CHIPS.filter((chip) => categories.includes(chip.category))

  return (
    <Container wide>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        {/* ============================= MAIN COLUMN ============================= */}
        <div className="space-y-6">
          {/* Hero */}
          <section className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                100% Free <span className="text-gray-300">&middot;</span> No Sign Up{' '}
                <span className="text-gray-300">&middot;</span> Always
              </p>
              <h1 className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Thousands of free tools for{' '}
                <span className="accent-underline text-primary">every</span> task.
              </h1>
              <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-gray-500">
                Calculate, convert, create, and simplify your everyday life with our powerful
                online tools.
              </p>

              <ToolSearch items={searchItems} />

              {popularChips.length > 0 && (
                <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-900 dark:text-white">Popular:</span>
                  {popularChips.map((tool) => (
                    <Link
                      key={tool.config.id}
                      href={toolPath(tool)}
                      className="rounded-full border border-gray-200 px-3 py-1 transition-colors hover:border-primary hover:text-primary dark:border-gray-700 dark:hover:text-secondary"
                    >
                      {tool.config.title}
                    </Link>
                  ))}
                </p>
              )}
            </div>

            {/* Decorative app-window illustration — no fabricated content */}
            {heroChips.length > 0 && (
              <div className="relative hidden h-80 items-center justify-center lg:flex" aria-hidden="true">
                <div className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 rounded-card border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center gap-1.5 rounded-t-card bg-gray-900 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-error/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="h-2 w-3/4 rounded-full bg-gray-100 dark:bg-gray-700" />
                    <div className="h-2 w-1/2 rounded-full bg-gray-100 dark:bg-gray-700" />
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {WINDOW_SWATCHES.map((swatch, index) => (
                        <div key={index} className={`h-10 rounded-lg ${swatch}`} />
                      ))}
                    </div>
                  </div>
                </div>

                <Image
                  src="/brand/icon-mark.png"
                  alt=""
                  width={120}
                  height={132}
                  className="absolute -bottom-2 left-6 drop-shadow-xl"
                  style={{ height: 'auto' }}
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

          {/* Trust / stats bar */}
          <StatBar
            items={[
              { icon: <Wrench size={24} strokeWidth={2} />, value: String(allTools.length), label: 'Free Tools' },
              { icon: <Heart size={24} strokeWidth={2} />, value: '100%', label: 'Free Forever' },
              { icon: <UserCheck size={24} strokeWidth={2} />, value: 'No Signup', label: 'Required' },
              { icon: <ShieldCheck size={24} strokeWidth={2} />, value: 'Secure', label: '& Private' },
            ]}
          />

          {/* Browse by categories */}
          <section
            id="categories"
            className="rounded-card border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/40"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Browse by Categories</h2>
              <Link
                href="/#categories"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline dark:text-secondary"
              >
                View all categories
                <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={categoryPath(category)}
                  className="flex flex-col items-center gap-2 rounded-card border border-gray-100 p-4 text-center transition-shadow hover:shadow-md dark:border-gray-700"
                >
                  <CategoryIcon category={category} size={44} />
                  <span className="text-sm font-semibold">{categoryLabel(category)}</span>
                  <span className="text-xs text-gray-500">
                    {getToolsByCategory(category).length} tool
                    {getToolsByCategory(category).length === 1 ? '' : 's'}
                  </span>
                </Link>
              ))}

              {/* Explore-all tile — honest CTA, not a fabricated category */}
              <Link
                href="/#popular"
                className="flex flex-col items-center justify-center gap-2 rounded-card border border-dashed border-gray-200 p-4 text-center text-gray-500 transition-colors hover:border-primary hover:text-primary dark:border-gray-700"
              >
                <span className="grid h-11 w-11 place-items-center rounded-card bg-gray-100 dark:bg-gray-700">
                  <Layers size={22} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold">More</span>
                <span className="text-xs">Explore all</span>
              </Link>
            </div>
          </section>

          {/* Popular tools */}
          <section
            id="popular"
            className="rounded-card border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/40"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Popular Tools</h2>
              <Link
                href="/#tool-search"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline dark:text-secondary"
              >
                View all tools
                <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
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

        {/* ============================== SIDEBAR =============================== */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <AdSlot />

          {recentTools.length > 0 && (
            <div
              id="recently-added"
              className="rounded-card border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800/40"
            >
              <h3 className="flex items-center gap-2 font-semibold">
                <Sparkles size={18} className="text-accent" aria-hidden="true" />
                Recently added
              </h3>
              <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-700">
                {recentTools.map((tool, index) => (
                  <li key={tool.config.id} className="py-2 first:pt-0 last:pb-0">
                    <Link
                      href={toolPath(tool)}
                      className="group flex items-center gap-3 hover:text-primary dark:hover:text-secondary"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gray-100 text-xs font-semibold text-gray-500 dark:bg-gray-700">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{tool.config.title}</span>
                        <span className="block text-xs text-gray-400">{categoryLabel(tool.config.category)}</span>
                      </span>
                      <ArrowRight
                        size={14}
                        strokeWidth={2.5}
                        aria-hidden="true"
                        className="shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stay updated */}
          <div className="rounded-card border border-gray-200 bg-primary/5 p-5 dark:border-gray-700 dark:bg-gray-800/40">
            <h3 className="flex items-center gap-2 font-semibold">
              <Send size={18} className="text-primary" aria-hidden="true" />
              Stay Updated
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Get new tools and updates delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </aside>
      </div>
    </Container>
  )
}
