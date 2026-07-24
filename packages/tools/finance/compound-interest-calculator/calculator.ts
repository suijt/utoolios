/** Pure compound interest math (docs/08 §4). No framework, no I/O. */

export interface CompoundInterestInput {
  /** Starting principal in the display currency. */
  principal: number
  /** Annual interest rate as a percentage, e.g. 5 for 5%. */
  annualRate: number
  /** Number of years invested. */
  years: number
  /** How many times per year interest compounds (1, 2, 4, 12, or 365). */
  compoundsPerYear: number
}

export interface CompoundInterestOutput {
  finalAmount: number
  totalInterest: number
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestOutput {
  const rate = input.annualRate / 100
  const periods = input.compoundsPerYear * input.years
  const finalAmount = input.principal * Math.pow(1 + rate / input.compoundsPerYear, periods)
  return { finalAmount, totalInterest: finalAmount - input.principal }
}
