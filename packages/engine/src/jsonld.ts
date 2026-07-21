import type { AnyToolPlugin } from '@utoolios/core'
import { breadcrumbs, toolUrl } from './routing'

/**
 * Structured data engine (docs/16). Generates JSON-LD from the tool declaration:
 * SoftwareApplication (the tool), FAQPage (from content.faq), and BreadcrumbList.
 * We only emit markup for content actually on the page (docs/16 anti-spam rule).
 */

// JSON-LD is inherently dynamic; a loose record type is appropriate here.
export type JsonLd = Record<string, unknown>

export function buildJsonLd(tool: AnyToolPlugin): JsonLd[] {
  const graph: JsonLd[] = [softwareApplication(tool), breadcrumbList(tool)]
  const faq = tool.content?.faq
  if (tool.config.flags.showFaq && faq && faq.length > 0) {
    graph.push(faqPage(faq))
  }
  return graph
}

function softwareApplication(tool: AnyToolPlugin): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.config.title,
    description: tool.config.summary,
    url: toolUrl(tool),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }
}

function breadcrumbList(tool: AnyToolPlugin): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs(tool).map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

function faqPage(faq: readonly { readonly q: string; readonly a: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}
