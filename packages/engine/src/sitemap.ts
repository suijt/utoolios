import type { AnyToolPlugin } from '@utoolios/core'
import { SITE_URL, toolUrl } from './routing'

/**
 * Sitemap generation from the registry (docs/14 §5). Always correct by
 * construction — a new tool auto-appears. Only published tools are included.
 */

export interface SitemapEntry {
  readonly url: string
  readonly changeFrequency: 'daily' | 'weekly' | 'monthly'
  readonly priority: number
}

export function buildSitemap(tools: readonly AnyToolPlugin[]): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
  ]
  for (const tool of tools) {
    if (tool.config.status !== 'published') continue
    entries.push({ url: toolUrl(tool), changeFrequency: 'monthly', priority: 0.8 })
  }
  return entries
}
