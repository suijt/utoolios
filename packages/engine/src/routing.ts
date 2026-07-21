import type { AnyToolPlugin, ToolCategory } from '@utoolios/core'

/**
 * Convention over configuration (docs/00 §4.7, docs/14): a tool's URL is derived
 * from its category + slug. This is the ONLY place URL structure is defined.
 */

export const SITE_URL = 'https://utoolios.com'

/** Relative path, e.g. "/finance/mortgage-calculator". */
export function toolPath(tool: AnyToolPlugin): string {
  return `/${tool.config.category}/${tool.config.id}`
}

/** Absolute canonical URL (docs/14 §4). */
export function toolUrl(tool: AnyToolPlugin): string {
  return `${SITE_URL}${toolPath(tool)}`
}

export function categoryPath(category: ToolCategory): string {
  return `/${category}`
}

/** Breadcrumb trail for a tool (docs/18). */
export interface Crumb {
  readonly name: string
  readonly url: string
}

export function breadcrumbs(tool: AnyToolPlugin): readonly Crumb[] {
  const category = tool.config.category
  return [
    { name: 'Home', url: SITE_URL },
    { name: capitalize(category), url: `${SITE_URL}${categoryPath(category)}` },
    { name: tool.config.title, url: toolUrl(tool) },
  ]
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
