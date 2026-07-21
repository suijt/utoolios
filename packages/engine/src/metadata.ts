import type { AnyToolPlugin } from '@utoolios/core'
import { toolUrl } from './routing'

/**
 * Metadata engine (docs/15). Generates title/description/canonical/OG from the
 * tool's declaration using proven templates. Great default from config; the
 * ~60-char title and ~155-char description limits are enforced by tests (docs/15).
 */

const SITE_NAME = 'UToolios'

export interface ToolMetadata {
  readonly title: string
  readonly description: string
  readonly canonical: string
  readonly openGraph: {
    readonly title: string
    readonly description: string
    readonly url: string
    readonly siteName: string
    readonly type: 'website'
  }
}

export function buildMetadata(tool: AnyToolPlugin): ToolMetadata {
  const title = `${tool.config.title} | ${SITE_NAME}`
  const description = clampDescription(tool.config.summary)
  const url = toolUrl(tool)
  return {
    title,
    description,
    canonical: url,
    openGraph: {
      title: tool.config.title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
  }
}

/** Keep descriptions in the ~155-char search-snippet sweet spot (docs/15 §4). */
function clampDescription(summary: string): string {
  const max = 155
  if (summary.length <= max) return summary
  return `${summary.slice(0, max - 1).trimEnd()}…`
}
