import Link from 'next/link'
import { Container } from '@utoolios/ui'
import { getAllCategories, getAllTools, getToolsByCategory } from '@utoolios/tools'
import { toolPath } from '@utoolios/engine'
import { CategoryIcon, categoryLabel } from '@/components/category-icon'
import { ToolSearch } from '@/components/tool-search'

/** Homepage (docs/02 anatomy, brand mockup). Everything is generated from the registry. */
export default function HomePage() {
  const categories = getAllCategories()
  const allTools = getAllTools()
  const searchItems = allTools.map((tool) => ({
    id: tool.config.id,
    title: tool.config.title,
    summary: tool.config.summary,
    path: toolPath(tool),
  }))

  return (
    <Container>
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Find the right tool for{' '}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            any task
          </span>
          .
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
          Thousands of free online tools to calculate, convert, and simplify your everyday life —
          fast, simple, and secure.
        </p>
        <ToolSearch items={searchItems} />

        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          <li className="font-semibold">
            🌱 <span className="text-primary dark:text-secondary">Free</span> Forever
          </li>
          <li className="font-semibold">🔒 Secure &amp; Private</li>
          <li className="font-semibold">🙅 No Signup Required</li>
          <li className="font-semibold">⚡ Instant Results</li>
        </ul>
      </section>

      {/* Categories */}
      <section id="categories" className="mt-16">
        <h2 className="text-2xl font-bold">Browse by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {categories.map((category) => {
            const tools = getToolsByCategory(category)
            return (
              <div
                key={category}
                className="rounded-card border border-gray-200 p-5 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <CategoryIcon category={category} />
                  <div>
                    <h3 className="font-semibold">{categoryLabel(category)}</h3>
                    <p className="text-sm text-gray-500">{tools.length} tool{tools.length === 1 ? '' : 's'}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-1">
                  {tools.map((tool) => (
                    <li key={tool.config.id}>
                      <Link
                        href={toolPath(tool)}
                        className="text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-secondary"
                      >
                        {tool.config.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Popular tools */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold">Popular tools</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allTools.map((tool) => (
            <Link
              key={tool.config.id}
              href={toolPath(tool)}
              className="block rounded-card border border-gray-200 p-5 transition hover:border-primary hover:shadow-md dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <CategoryIcon category={tool.config.category} size={36} />
                <div>
                  <span className="font-semibold">{tool.config.title}</span>
                  <span className="block text-xs uppercase tracking-wide text-gray-400">
                    {categoryLabel(tool.config.category)}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500">{tool.config.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  )
}
