/**
 * Pure mortgage math (docs/08 §4). No framework, no I/O. This exact function
 * powers the web page, the future API, and mobile (docs/03 R4).
 */

export interface MortgageInput {
  /** Loan principal in the display currency. */
  principal: number
  /** Annual interest rate as a percentage, e.g. 6.5 for 6.5%. */
  annualRate: number
  /** Loan term in whole years. */
  years: number
}

export interface MortgageOutput {
  monthlyPayment: number
  totalInterest: number
  totalCost: number
}

export function calculateMortgage(input: MortgageInput): MortgageOutput {
  const months = input.years * 12
  const monthlyRate = input.annualRate / 100 / 12

  // Zero-interest edge case: straight-line repayment.
  const monthlyPayment =
    monthlyRate === 0
      ? input.principal / months
      : (input.principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)

  const totalCost = monthlyPayment * months
  const totalInterest = totalCost - input.principal

  return { monthlyPayment, totalInterest, totalCost }
}
