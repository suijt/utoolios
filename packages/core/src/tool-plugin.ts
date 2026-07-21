import type { z } from 'zod'

/**
 * THE PLUGIN CONTRACT (docs/13-TOOL-PLUGIN-ARCHITECTURE.md).
 *
 * This file is the platform's "constitution within the constitution": every tool
 * must satisfy `ToolPlugin`, so the compiler ENFORCES the contract. A tool that
 * forgets a required field or gives it the wrong shape fails the build — it can
 * never ship broken. This is what makes AI generation safe (docs/07 §9, docs/35).
 *
 * A tool declares WHAT IT IS; the engine (packages/engine) provides everything
 * about HOW IT IS PRESENTED (route, metadata, JSON-LD, sitemap, search, ads,
 * layout, a11y). Adding tool #501 = one folder, zero platform code changes.
 */

/** Tool categories map 1:1 to URL segments and SEO content clusters (docs/06, docs/17). */
export type ToolCategory = 'finance' | 'developer' | 'health' | 'text' | 'home'

/** Quality tier (docs/02 §5). Correctness is mandatory (bronze); richness is earned by demand. */
export type ToolTier = 'bronze' | 'silver' | 'gold'

/** Publication state. Draft tools are `noindex` and excluded from the registry until published (docs/14 §7). */
export type ToolStatus = 'draft' | 'published'

/** Platform behaviours a tool opts into. Config over hardcoding (docs/00 §4.6). */
export interface ToolFlags {
  /** Show ad slots on this tool's page (docs/19). */
  readonly ads: boolean
  /** Show the "Related Tools" section (docs/18). */
  readonly showRelated: boolean
  /** Show the long-form article section (docs/02 anatomy). */
  readonly showArticle: boolean
  /** Show the FAQ section + emit FAQ JSON-LD (docs/16). */
  readonly showFaq: boolean
}

/** The tool's identity card — the first thing the engine reads (docs/13 §3.1). */
export interface ToolConfig {
  /** Canonical slug: folder = URL = analytics key = search key (docs/09 §5). kebab-case. */
  readonly id: string
  /** Human-facing title, e.g. "Mortgage Calculator". */
  readonly title: string
  readonly category: ToolCategory
  /** One-line description used in metadata and listings (docs/15). */
  readonly summary: string
  /** Keywords for search + related resolution (docs/32). */
  readonly tags: readonly string[]
  /** True only when the tool genuinely needs a server — the economic danger zone (docs/11 §5). */
  readonly serverSide: boolean
  readonly tier: ToolTier
  readonly status: ToolStatus
  readonly flags: ToolFlags
}

/** A worked example: shown to users AND reused as a test fixture (docs/13 §3.4). */
export interface ToolExample<Input = unknown, Output = unknown> {
  readonly label: string
  readonly input: Input
  readonly expected: Output
}

/**
 * The full plugin. Generic over its Input/Output so `inputSchema` and `calculate`
 * are type-linked: the compiler guarantees the logic consumes what the schema validates.
 */
export interface ToolPlugin<Input = unknown, Output = unknown> {
  readonly config: ToolConfig

  /** Zod schema validating raw input at the boundary before logic runs (docs/08 §3). */
  readonly inputSchema: z.ZodType<Input>

  /** Optional schema for the result shape (useful for the public API, docs/22). */
  readonly outputSchema?: z.ZodType<Output>

  /**
   * The pure calculation (docs/08 §4). Same input -> same output, no side effects,
   * no framework imports. This SAME function powers web, API, and mobile (docs/03 R4).
   */
  readonly calculate: (input: Input) => Output

  /** IDs of related tools -> internal links (docs/18). */
  readonly related: readonly string[]

  /** Worked examples (docs/13 §3.4). */
  readonly examples: readonly ToolExample<Input, Output>[]
}

/**
 * Helper to define a tool with full type inference and contract enforcement.
 * Usage in a tool's index.ts:  export default defineTool({ ... })
 */
export function defineTool<Input, Output>(
  plugin: ToolPlugin<Input, Output>,
): ToolPlugin<Input, Output> {
  return plugin
}
