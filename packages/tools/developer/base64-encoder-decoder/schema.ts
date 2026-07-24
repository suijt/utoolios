import { z } from 'zod'
import type { Base64Input } from './calculator'
import { decodeBase64 } from './calculator'

/** Boundary validation (docs/08 §3): decode mode must be valid Base64 before `calculate` ever runs. */
export const base64Schema: z.ZodType<Base64Input> = z
  .object({
    text: z.string(),
    mode: z.enum(['encode', 'decode']),
  })
  .refine((value) => value.mode === 'encode' || isValidBase64(value.text), {
    message: 'Enter valid Base64 text to decode.',
    path: ['text'],
  })

function isValidBase64(value: string): boolean {
  try {
    decodeBase64(value)
    return true
  } catch {
    return false
  }
}
