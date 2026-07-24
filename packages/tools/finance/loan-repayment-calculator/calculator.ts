/** Pure loan amortization math (docs/08 §4). No framework, no I/O. */

export interface LoanRepaymentInput {
  /** Loan amount in the display currency. */
  loanAmount: number
  /** Annual interest rate as a percentage, e.g. 6.5 for 6.5%. */
  annualRate: number
  /** Loan term in whole months (common for auto and personal loans). */
  termMonths: number
}

export interface LoanRepaymentOutput {
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
}

export function calculateLoanRepayment(input: LoanRepaymentInput): LoanRepaymentOutput {
  const monthlyRate = input.annualRate / 100 / 12
  const months = input.termMonths

  const monthlyPayment =
    monthlyRate === 0
      ? input.loanAmount / months
      : (input.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)

  const totalPayment = monthlyPayment * months
  const totalInterest = totalPayment - input.loanAmount

  return { monthlyPayment, totalInterest, totalPayment }
}
