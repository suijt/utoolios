import type { MetadataRoute } from 'next'
import { getAllTools } from '@utoolios/tools'
import { buildSitemap } from '@utoolios/engine'

/** Sitemap generated from the registry (docs/14 §5) — always correct by construction. */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(getAllTools()).map((entry) => ({
    url: entry.url,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
