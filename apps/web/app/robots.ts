import type { MetadataRoute } from 'next'
import { SITE_URL } from '@utoolios/engine'

/** robots.txt — steers crawlers to the sitemap, keeps them out of internals (docs/14 §6). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
