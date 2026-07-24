import { z } from 'zod'

/**
 * Boundary validation (docs/08 §3). The `compoundsPerYear` select renders its
 * value as a string (docs/10 ToolRunner) — validated here as a string enum,
 * then converted to a number for the pure calculator in index.ts.
 */
export interface CompoundInterestFormInput {
  principal: number
  annualRate: number
  years: number
  compoundsPerYear: '1' | '2' | '4' | '12' | '365'
}

export const compoundInterestSchema: z.ZodType<CompoundInterestFormInput> = z.object({
  principal: z.number().positive(),
  annualRate: z.number().min(0).max(100),
  years: z.number().positive().max(100),
  compoundsPerYear: z.enum(['1', '2', '4', '12', '365']),
})
