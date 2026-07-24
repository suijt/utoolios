import { z } from 'zod'
import type { JsonFormatterInput } from './calculator'

/** Boundary validation (docs/08 §3): the JSON must parse before `calculate` ever runs. */
export const jsonFormatterSchema: z.ZodType<JsonFormatterInput> = z.object({
  json: z.string().min(1).refine(isValidJson, { message: 'Enter valid JSON.' }),
  indent: z.number().int().min(0).max(8),
})

function isValidJson(value: string): boolean {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}
