import { describe, it, expect } from 'vitest'
import { calculateLoanRepayment } from './calculator'

describe('loan-repayment-calculator', () => {
  it('computes the standard amortized monthly payment', () => {
    const result = calculateLoanRepayment({ loanAmount: 20000, annualRate: 6, termMonths: 48 })
    expect(Math.round(result.monthlyPayment * 100) / 100).toBe(469.7)
    expect(Math.round(result.totalInterest * 100) / 100).toBe(2545.63)
  })

  it('handles the zero-interest edge case (straight-line repayment)', () => {
    const result = calculateLoanRepayment({ loanAmount: 12000, annualRate: 0, termMonths: 12 })
    expect(result.monthlyPayment).toBe(1000)
    expect(result.totalInterest).toBe(0)
  })
})
