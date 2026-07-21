import { z } from 'zod'
import type { WordCounterInput } from './calculator'

export const wordCounterSchema: z.ZodType<WordCounterInput> = z.object({
  text: z.string().max(100000),
})
