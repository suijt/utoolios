import type { z } from 'zod'

/**
 * THE PLUGIN CONTRACT (docs/13-TOOL-PLUGIN-ARCHITECTURE.md).
 *
 * This file is the platform's "constitution within the constitution": every tool
 * must satisfy `ToolPlugin`, so the compiler ENFORCES the contract. A tool that
 * forgets a required field or gives it the wrong shape fails the build — it can
 * never ship broken. This is what makes AI generation safe (docs/07 §9, docs/35).
 *
 * A tool declares WHAT IT IS (identity, inputs, logic, how to render, content);
 * the engine + one page.tsx provide HOW IT IS PRESENTED (route, metadata, JSON-LD,
 * sitemap, search, ads, layout, a11y). Adding tool #501 = one folder, zero platform edits.
 */

/** Tool categories map 1:1 to URL segments and SEO content clusters (docs/06, docs/17). */
export type ToolCategory = 'finance' | 'developer' | 'health' | 'text' | 'home'

/** Quality tier (docs/02 §5). Correctness is mandatory (bronze); richness is earned by demand. */
export type ToolTier = 'bronze' | 'silver' | 'gold'

/** Publication state. Draft tools are `noindex` and excluded from the registry (docs/14 §7). */
export type ToolStatus = 'draft' | 'published'

/** Platform behaviours a tool opts into. Config over hardcoding (docs/00 §4.6). */
export interface ToolFlags {
  readonly ads: boolean
  readonly showRelated: boolean
  readonly showArticle: boolean
  readonly showFaq: boolean
}

/** The tool's identity card — the first thing the engine reads (docs/13 §3.1). */
export interface ToolConfig {
  /** Canonical slug: folder = URL = analytics key = search key (docs/09 §5). kebab-case. */
  readonly id: string
  readonly title: string
  readonly category: ToolCategory
  /** One-line description used in metadata and listings (docs/15). */
  readonly summary: string
  readonly tags: readonly string[]
  /** True only when the tool genuinely needs a server — the economic danger zone (docs/11 §5). */
  readonly serverSide: boolean
  readonly tier: ToolTier
  readonly status: ToolStatus
  readonly flags: ToolFlags
}

/**
 * A declarative input-field descriptor. The generic ToolRunner renders any tool's
 * form from these — this is why no per-tool frontend code is needed (docs/10).
 * The Zod `inputSchema` still does the real validation (docs/08 §3).
 */
export interface InputField {
  readonly name: string
  readonly label: string
  readonly kind: 'number' | 'text' | 'select'
  readonly unit?: string
  readonly placeholder?: string
  readonly defaultValue?: string | number
  readonly options?: readonly { readonly label: string; readonly value: string }[]
  readonly min?: number
  readonly max?: number
  readonly step?: number
}

/** One line in the rendered result card. `primary` = the headline answer (docs/02 anatomy). */
export interface ResultLine {
  readonly label: string
  readonly value: string
  readonly primary?: boolean
}

/** A worked example: shown to users AND reusable as a test fixture (docs/13 §3.4). */
export interface ToolExample<Input = unknown, Output = unknown> {
  readonly label: string
  readonly input: Input
  readonly expected: Output
}

export interface ToolFaqItem {
  readonly q: string
  readonly a: string
}

/** On-page content that also feeds SEO (article body, FAQ -> FAQ JSON-LD, docs/16). */
export interface ToolContent {
  /** Short explanation shown under the result (docs/02 C4). */
  readonly explanation?: string
  /** Assumptions / sources — the trust block (docs/02 C2). */
  readonly assumptions?: readonly string[]
  /** Long-form article (markdown) for SEO depth (docs/02 anatomy, docs/34). */
  readonly article?: string
  readonly faq?: readonly ToolFaqItem[]
}

/**
 * The full plugin. Generic over Input/Output so `inputSchema`, `calculate`, and
 * `present` are type-linked: the compiler guarantees the logic consumes what the
 * schema validates and the presenter renders what the logic produces.
 */
export interface ToolPlugin<Input = unknown, Output = unknown> {
  readonly config: ToolConfig

  /** Zod schema validating raw input at the boundary before logic runs (docs/08 §3). */
  readonly inputSchema: z.ZodType<Input>

  /** Optional schema for the result shape (useful for the public API, docs/22). */
  readonly outputSchema?: z.ZodType<Output>

  /** Declarative fields for the generic form renderer. */
  readonly inputFields: readonly InputField[]

  /**
   * The pure calculation (docs/08 §4). Same input -> same output, no side effects,
   * no framework imports. This SAME function powers web, API, and mobile (docs/03 R4).
   */
  readonly calculate: (input: Input) => Output

  /** Pure function turning a result into display lines for the generic result card. */
  readonly present: (output: Output, input: Input) => readonly ResultLine[]

  /** IDs of related tools -> internal links (docs/18). */
  readonly related: readonly string[]

  /** Worked examples (docs/13 §3.4). */
  readonly examples: readonly ToolExample<Input, Output>[]

  /** On-page + SEO content (docs/16, docs/34). */
  readonly content?: ToolContent
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

/** A tool with its type parameters erased — how the registry and engine handle them uniformly. */
export type AnyToolPlugin = ToolPlugin<unknown, unknown>
