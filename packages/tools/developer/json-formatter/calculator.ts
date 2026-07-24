/** Pure JSON formatting (docs/08 §4). No framework, no I/O. */

export interface JsonFormatterInput {
  json: string
  /** Spaces to indent by (0-8). */
  indent: number
}

export interface JsonFormatterOutput {
  formatted: string
  minified: string
  keyCount: number
}

export function formatJson(input: JsonFormatterInput): JsonFormatterOutput {
  const parsed = JSON.parse(input.json)
  return {
    formatted: JSON.stringify(parsed, null, input.indent),
    minified: JSON.stringify(parsed),
    keyCount: countKeys(parsed),
  }
}

function countKeys(value: unknown): number {
  if (Array.isArray(value)) {
    return value.reduce((sum: number, item) => sum + countKeys(item), 0)
  }
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    return entries.length + entries.reduce((sum, [, item]) => sum + countKeys(item), 0)
  }
  return 0
}
