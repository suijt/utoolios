import Link from 'next/link'
import { Container } from '@utoolios/ui'
import { getAllCategories, getToolsByCategory } from '@utoolios/tools'
import { toolPath } from '@utoolios/engine'

/**
 * Home page — lists every tool by category, generated entirely from the registry.
 * Adding a tool folder makes it appear here automatically (docs/13).
 */
export default function HomePage() {
  const categories = getAllCategories()
  return (
    <Container>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Find the right tool for <span className="text-primary dark:text-secondary">any task</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-500">
        Free online tools to calculate, convert, and simplify your everyday life — fast, simple,
        and secure.
      </p>

      {categories.map((category) => (
        <section key={category} className="mt-10">
          <h2 className="text-lg font-semibold capitalize text-gray-700 dark:text-gray-200">
            {category}
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {getToolsByCategory(category).map((tool) => (
              <li key={tool.config.id}>
                <Link
                  href={toolPath(tool)}
                  className="block rounded-card border border-gray-200 p-4 transition hover:border-primary dark:border-gray-700"
                >
                  <span className="font-semibold">{tool.config.title}</span>
                  <span className="mt-1 block text-sm text-gray-500">{tool.config.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  )
}
