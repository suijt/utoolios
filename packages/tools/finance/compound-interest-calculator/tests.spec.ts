import { describe, it, expect } from 'vitest'
import { calculateCompoundInterest } from './calculator'

describe('compound-interest-calculator', () => {
  it('computes compound growth with monthly compounding', () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      annualRate: 5,
      years: 10,
      compoundsPerYear: 12,
    })
    expect(Math.round(result.finalAmount * 100) / 100).toBe(16470.09)
    expect(Math.round(result.totalInterest * 100) / 100).toBe(6470.09)
  })

  it('handles a zero interest rate (no growth)', () => {
    const result = calculateCompoundInterest({
      principal: 5000,
      annualRate: 0,
      years: 5,
      compoundsPerYear: 12,
    })
    expect(result.finalAmount).toBe(5000)
    expect(result.totalInterest).toBe(0)
  })
})
