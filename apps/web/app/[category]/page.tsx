import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, ToolCard } from '@utoolios/ui'
import { getAllCategories, getToolsByCategory } from '@utoolios/tools'
import { categoryPath, toolPath, SITE_URL } from '@utoolios/engine'
import type { ToolCategory } from '@utoolios/core'
import { CategoryIcon, categoryLabel } from '@/components/category-icon'

/** Category listing page (DESIGN-SPEC §6.4) — one page renders every category, same pattern as the tool page. */

interface PageParams {
  category: string
}

export function generateStaticParams(): PageParams[] {
  return getAllCategories().map((category) => ({ category }))
}

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const category = resolve(params)
  if (!category) return {}
  const label = categoryLabel(category)
  const title = `${label} Tools | UToolios`
  const description = `Free ${label.toLowerCase()} tools — ${getToolsByCategory(category).length} to calculate, convert, and simplify your everyday life.`
  const url = `${SITE_URL}${categoryPath(category)}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'UToolios', type: 'website' },
  }
}

export default function CategoryPage({ params }: { params: PageParams }) {
  const category = resolve(params)
  if (!category) notFound()

  const tools = getToolsByCategory(category)
  const label = categoryLabel(category)

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span aria-current="page">{label}</span>
      </nav>

      <div className="mt-3 flex items-center gap-3">
        <CategoryIcon category={category} size={40} />
        <h1 className="text-3xl font-bold tracking-tight">{label} tools</h1>
      </div>
      <p className="mt-2 text-gray-500">
        {tools.length} free {label.toLowerCase()} tool{tools.length === 1 ? '' : 's'} — no signup,
        instant results.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard
            key={tool.config.id}
            href={toolPath(tool)}
            icon={<CategoryIcon category={tool.config.category} size={40} />}
            title={tool.config.title}
            categoryLabel={label}
            summary={tool.config.summary}
          />
        ))}
      </div>
    </Container>
  )
}

function resolve(params: PageParams): ToolCategory | undefined {
  return getAllCategories().find((category) => category === params.category)
}
