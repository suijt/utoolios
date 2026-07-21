import { describe, it, expect } from 'vitest'
import { calculateMortgage } from './calculator'

describe('mortgage-calculator', () => {
  it('computes the standard amortized monthly payment', () => {
    const result = calculateMortgage({ principal: 400000, annualRate: 6.5, years: 30 })
    expect(Math.round(result.monthlyPayment)).toBe(2528)
    expect(Math.round(result.totalCost)).toBe(Math.round(result.monthlyPayment * 360))
  })

  it('handles the zero-interest edge case (straight-line repayment)', () => {
    const result = calculateMortgage({ principal: 12000, annualRate: 0, years: 1 })
    expect(result.monthlyPayment).toBe(1000)
    expect(result.totalInterest).toBe(0)
  })
})
