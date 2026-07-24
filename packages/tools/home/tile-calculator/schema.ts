import { z } from 'zod'
import type { TileCalculatorInput } from './calculator'

/** Boundary validation (docs/08 §3). */
export const tileCalculatorSchema: z.ZodType<TileCalculatorInput> = z.object({
  roomLength: z.number().positive().max(1000),
  roomWidth: z.number().positive().max(1000),
  tileLength: z.number().positive().max(1000),
  tileWidth: z.number().positive().max(1000),
  wastagePercent: z.number().min(0).max(100),
})
