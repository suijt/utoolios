import { z } from 'zod'
import type { TdeeInput } from './calculator'

/** Boundary validation (docs/08 §3). */
export const tdeeSchema: z.ZodType<TdeeInput> = z.object({
  sex: z.enum(['male', 'female']),
  age: z.number().int().min(15).max(120),
  weightKg: z.number().positive().max(500),
  heightCm: z.number().positive().min(50).max(300),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
})
