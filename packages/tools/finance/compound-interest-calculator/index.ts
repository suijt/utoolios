import { defineTool, formatCurrency } from '@utoolios/core'
import { compoundInterestSchema } from './schema'
import { calculateCompoundInterest } from './calculator'

/**
 * Compound Interest Calculator (docs/13 assembles the plugin). The engine turns
 * this one folder into a fully-routed, SEO-optimized, accessible live tool.
 */
export default defineTool({
  config: {
    id: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    category: 'finance',
    summary:
      'Calculate how your savings or investment grows over time with compound interest — free and instant.',
    tags: ['compound interest', 'savings', 'investment', 'finance'],
    serverSide: false,
    tier: 'silver',
    status: 'published',
    flags: { ads: true, showRelated: true, showArticle: true, showFaq: true },
  },
  inputSchema: compoundInterestSchema,
  inputFields: [
    { name: 'principal', label: 'Starting amount', kind: 'number', unit: '$', defaultValue: 10000, min: 0, step: 100 },
    { name: 'annualRate', label: 'Annual interest rate', kind: 'number', unit: '%', defaultValue: 5, min: 0, max: 100, step: 0.01 },
    { name: 'years', label: 'Years invested', kind: 'number', unit: 'years', defaultValue: 10, min: 1, max: 100, step: 1 },
    {
      name: 'compoundsPerYear',
      label: 'Compounding frequency',
      kind: 'select',
      defaultValue: 12,
      options: [
        { label: 'Annually', value: '1' },
        { label: 'Semi-annually', value: '2' },
        { label: 'Quarterly', value: '4' },
        { label: 'Monthly', value: '12' },
        { label: 'Daily', value: '365' },
      ],
    },
  ],
  calculate: (input) =>
    calculateCompoundInterest({ ...input, compoundsPerYear: Number(input.compoundsPerYear) }),
  present: (output) => [
    { label: 'Final amount', value: formatCurrency(output.finalAmount), primary: true },
    { label: 'Total interest earned', value: formatCurrency(output.totalInterest) },
  ],
  related: ['mortgage-calculator', 'loan-repayment-calculator'],
  examples: [
    {
      label: '$10,000 at 5% for 10 years, compounded monthly',
      input: { principal: 10000, annualRate: 5, years: 10, compoundsPerYear: '12' },
      expected: { finalAmount: 16470.0949769028, totalInterest: 6470.094976902801 },
    },
  ],
  content: {
    explanation:
      'Interest is calculated on your growing balance, not just your starting amount — so the more often it compounds, the faster your money grows.',
    assumptions: [
      'Assumes a fixed annual interest rate for the whole period.',
      'No additional deposits or withdrawals are included.',
      'Interest compounds at the selected frequency (e.g. monthly).',
    ],
    article:
      '## How compound interest is calculated\n\nThe final amount (A) is derived from the principal (P), the annual rate (r), the number of compounding periods per year (n), and the number of years (t):\n\n`A = P · (1 + r/n)^(n·t)`\n\nBecause each period\'s interest is added to the balance before the next period compounds, growth accelerates over time — this is the difference between compound and simple interest.',
    faq: [
      {
        q: 'What compounding frequency should I use?',
        a: 'Use whatever your bank or investment states — savings accounts are often compounded daily or monthly, while some investments compound annually.',
      },
      {
        q: 'Does this include regular deposits?',
        a: 'No. This calculates growth of a single starting amount only. Regular contributions would increase the final amount further.',
      },
    ],
  },
})
