import { z } from 'zod'
import type { BmiInput } from './calculator'

export const bmiSchema: z.ZodType<BmiInput> = z.object({
  weightKg: z.number().positive().max(500),
  heightCm: z.number().positive().min(50).max(300),
})
