import { defineTool, formatCurrency } from '@utoolios/core'
import { loanRepaymentSchema } from './schema'
import { calculateLoanRepayment } from './calculator'

/**
 * Loan Repayment Calculator (docs/13 assembles the plugin) — for personal, auto,
 * and other fixed-term loans quoted in months rather than years.
 */
export default defineTool({
  config: {
    id: 'loan-repayment-calculator',
    title: 'Loan Repayment Calculator',
    category: 'finance',
    summary:
      'Calculate your monthly payment, total interest, and total cost for any fixed-term loan — free and instant.',
    tags: ['loan', 'repayment', 'auto loan', 'personal loan', 'finance'],
    serverSide: false,
    tier: 'silver',
    status: 'published',
    publishedAt: '2026-07-24',
    flags: { ads: true, showRelated: true, showArticle: true, showFaq: true },
  },
  inputSchema: loanRepaymentSchema,
  inputFields: [
    { name: 'loanAmount', label: 'Loan amount', kind: 'number', unit: '$', defaultValue: 20000, min: 0, step: 500 },
    { name: 'annualRate', label: 'Interest rate', kind: 'number', unit: '%', defaultValue: 6, min: 0, max: 100, step: 0.01 },
    { name: 'termMonths', label: 'Loan term', kind: 'number', unit: 'months', defaultValue: 48, min: 1, max: 600, step: 1 },
  ],
  calculate: calculateLoanRepayment,
  present: (output) => [
    { label: 'Monthly payment', value: formatCurrency(output.monthlyPayment), primary: true },
    { label: 'Total interest', value: formatCurrency(output.totalInterest) },
    { label: 'Total cost', value: formatCurrency(output.totalPayment) },
  ],
  related: ['mortgage-calculator', 'compound-interest-calculator'],
  examples: [
    {
      label: '$20,000 at 6% over 48 months',
      input: { loanAmount: 20000, annualRate: 6, termMonths: 48 },
      expected: { monthlyPayment: 469.7005809587213, totalInterest: 2545.627886018621, totalPayment: 22545.62788601862 },
    },
  ],
  content: {
    explanation:
      'Your monthly payment spreads the loan plus interest evenly across every month of the term, using the standard amortization formula.',
    assumptions: [
      'Assumes a fixed interest rate for the whole term.',
      'Assumes no extra or missed payments.',
      'Interest is compounded monthly.',
    ],
    article:
      '## How the loan payment is calculated\n\nThe monthly payment (M) is derived from the loan amount (P), the monthly interest rate (r), and the number of months (n):\n\n`M = P · r(1+r)^n / ((1+r)^n − 1)`\n\nBecause the rate is fixed, every payment is identical, but the split between interest and principal shifts over time — early payments are mostly interest, later payments mostly principal.',
    faq: [
      {
        q: 'How is this different from the mortgage calculator?',
        a: 'The math is the same amortization formula. This tool is framed in months, which is how auto and personal loans are usually quoted, rather than years.',
      },
      {
        q: 'Does this include fees?',
        a: 'No. This calculates principal and interest only — origination fees or add-ons would increase your actual cost.',
      },
    ],
  },
})
