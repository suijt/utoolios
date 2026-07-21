import { defineTool, formatCurrency } from '@utoolios/core'
import { mortgageSchema } from './schema'
import { calculateMortgage } from './calculator'

/**
 * Mortgage Calculator (docs/13 assembles the plugin). The engine turns this one
 * folder into a fully-routed, SEO-optimized, accessible live tool.
 */
export default defineTool({
  config: {
    id: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    category: 'finance',
    summary:
      'Calculate your monthly mortgage payment, total interest, and total cost from your loan amount, rate, and term — free and instant.',
    tags: ['mortgage', 'loan', 'home', 'finance', 'repayment'],
    serverSide: false,
    tier: 'silver',
    status: 'published',
    flags: { ads: true, showRelated: true, showArticle: true, showFaq: true },
  },
  inputSchema: mortgageSchema,
  inputFields: [
    { name: 'principal', label: 'Loan amount', kind: 'number', unit: '$', defaultValue: 400000, min: 0, step: 1000 },
    { name: 'annualRate', label: 'Interest rate', kind: 'number', unit: '%', defaultValue: 6.5, min: 0, max: 100, step: 0.01 },
    { name: 'years', label: 'Loan term', kind: 'number', unit: 'years', defaultValue: 30, min: 1, max: 50, step: 1 },
  ],
  calculate: calculateMortgage,
  present: (output) => [
    { label: 'Monthly payment', value: formatCurrency(output.monthlyPayment), primary: true },
    { label: 'Total interest', value: formatCurrency(output.totalInterest) },
    { label: 'Total cost', value: formatCurrency(output.totalCost) },
  ],
  related: ['compound-interest-calculator', 'loan-repayment-calculator'],
  examples: [
    {
      label: '$400,000 at 6.5% over 30 years',
      input: { principal: 400000, annualRate: 6.5, years: 30 },
      expected: { monthlyPayment: 2528.27, totalInterest: 510178.2, totalCost: 910178.2 },
    },
  ],
  content: {
    explanation:
      'Your monthly payment is calculated with the standard amortization formula, spreading the loan plus interest evenly across every month of the term.',
    assumptions: [
      'Assumes a fixed interest rate for the whole term.',
      'Excludes property tax, insurance, and HOA fees.',
      'Interest is compounded monthly.',
    ],
    article:
      '## How the mortgage payment is calculated\n\nThe monthly payment (M) is derived from the loan principal (P), the monthly interest rate (r), and the number of months (n):\n\n`M = P · r(1+r)^n / ((1+r)^n − 1)`\n\nBecause the rate is fixed, every payment is identical, but the split between interest and principal shifts over time — early payments are mostly interest, later payments mostly principal.',
    faq: [
      {
        q: 'Does this include property tax and insurance?',
        a: 'No. This calculates principal and interest only. Your total housing payment (PITI) would add property tax, homeowners insurance, and any HOA fees.',
      },
      {
        q: 'What interest rate should I use?',
        a: 'Use the annual percentage rate (APR) your lender quotes. The calculator converts it to a monthly rate internally.',
      },
    ],
  },
})
