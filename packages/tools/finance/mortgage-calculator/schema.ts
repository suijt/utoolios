import { z } from 'zod'
import type { MortgageInput } from './calculator'

/**
 * Boundary validation (docs/08 §3). Types describe expectations; this schema
 * checks the actual runtime value before the math ever runs.
 */
export const mortgageSchema: z.ZodType<MortgageInput> = z.object({
  principal: z.number().positive(),
  annualRate: z.number().min(0).max(100),
  years: z.number().int().positive().max(50),
})
