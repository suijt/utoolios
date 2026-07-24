import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AdSlot, Container, Tabs, type TabItem } from '@utoolios/ui'
import { getAllTools, getToolById } from '@utoolios/tools'
import { breadcrumbs, buildJsonLd, buildMetadata, toolPath } from '@utoolios/engine'
import { CategoryIcon } from '@/components/category-icon'
import { ToolRunner } from '@/components/tool-runner'

/**
 * THE single page that renders EVERY tool (docs/06 §6, docs/13, DESIGN-SPEC §6.3).
 * Adding a tool folder makes a new route appear here with full SEO — zero changes
 * to this file.
 */

interface PageParams {
  category: string
  tool: string
}

export function generateStaticParams(): PageParams[] {
  return getAllTools().map((tool) => ({
    category: tool.config.category,
    tool: tool.config.id,
  }))
}

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const tool = resolve(params)
  if (!tool) return {}
  const meta = buildMetadata(tool)
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      url: meta.openGraph.url,
      siteName: meta.openGraph.siteName,
      type: meta.openGraph.type,
    },
  }
}

export default function ToolPage({ params }: { params: PageParams }) {
  const tool = resolve(params)
  if (!tool) notFound()

  const crumbs = breadcrumbs(tool)
  const jsonLd = buildJsonLd(tool)
  const related = tool.related
    .map((id) => getToolById(id))
    .filter((value): value is NonNullable<typeof value> => value !== undefined)

  const tabs: TabItem[] = [
    {
      id: 'calculator',
      label: 'Calculator',
      content: (
        <div className="grid gap-6">
          <ToolRunner toolId={tool.config.id} />
          {tool.config.flags.ads && <AdSlot />}
        </div>
      ),
    },
  ]

  if (tool.content?.explanation) {
    tabs.push({
      id: 'formula',
      label: 'Formula',
      content: <p className="text-gray-600 dark:text-gray-300">{tool.content.explanation}</p>,
    })
  }

  if (tool.examples.length > 0) {
    tabs.push({
      id: 'examples',
      label: 'Examples',
      content: (
        <ul className="space-y-4">
          {tool.examples.map((example) => (
            <li key={example.label} className="rounded-card border border-gray-200 p-4 dark:border-gray-700">
              <p className="font-semibold">{example.label}</p>
              <dl className="mt-2 grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                {Object.entries(example.input as Record<string, unknown>).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <dt className="text-gray-400">{key}:</dt>
                    <dd>{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      ),
    })
  }

  if (tool.config.flags.showFaq && tool.content?.faq && tool.content.faq.length > 0) {
    tabs.push({
      id: 'faq',
      label: 'FAQ',
      content: (
        <div className="space-y-3">
          {tool.content.faq.map((item) => (
            <details key={item.q} className="rounded-card border border-gray-200 p-4 dark:border-gray-700">
              <summary className="cursor-pointer font-semibold">{item.q}</summary>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{item.a}</p>
            </details>
          ))}
        </div>
      ),
    })
  }

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        {crumbs.map((crumb, index) => (
          <span key={crumb.url}>
            {index > 0 && <span className="mx-1">/</span>}
            {index < crumbs.length - 1 ? (
              <Link href={crumb.url.replace('https://utoolios.com', '') || '/'} className="hover:underline">
                {crumb.name}
              </Link>
            ) : (
              <span aria-current="page">{crumb.name}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="mt-3 flex items-center gap-3">
        <CategoryIcon category={tool.config.category} size={40} />
        <h1 className="text-3xl font-bold tracking-tight">{tool.config.title}</h1>
      </div>
      <p className="mt-2 text-gray-500">{tool.config.summary}</p>

      <div className="mt-6">
        <Tabs items={tabs} />
      </div>

      {tool.content?.assumptions && tool.content.assumptions.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Assumptions</h2>
          <ul className="mt-2 list-inside list-disc text-gray-600 dark:text-gray-300">
            {tool.content.assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Related tools</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {related.map((item) => (
              <li key={item.config.id}>
                <Link
                  href={toolPath(item)}
                  className="rounded-full border border-gray-200 px-3 py-1 text-sm hover:border-primary dark:border-gray-700"
                >
                  {item.config.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tool.config.flags.showArticle && tool.content?.article && (
        <article className="mt-10">{renderArticle(tool.content.article)}</article>
      )}
    </Container>
  )
}

function resolve(params: PageParams) {
  const tool = getToolById(params.tool)
  if (!tool || tool.config.category !== params.category) return undefined
  return tool
}

/** Minimal markdown rendering for the article (headings + paragraphs) — full MD engine is a later refinement (docs/33). */
function renderArticle(markdown: string) {
  return markdown.split('\n\n').map((block, index) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={index} className="mt-6 text-xl font-bold">
          {block.slice(3)}
        </h2>
      )
    }
    return (
      <p key={index} className="mt-3 text-gray-600 dark:text-gray-300">
        {block}
      </p>
    )
  })
}
