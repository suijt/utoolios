import { z } from 'zod'
import type { LoanRepaymentInput } from './calculator'

/** Boundary validation (docs/08 §3). */
export const loanRepaymentSchema: z.ZodType<LoanRepaymentInput> = z.object({
  loanAmount: z.number().positive(),
  annualRate: z.number().min(0).max(100),
  termMonths: z.number().int().positive().max(600),
})
