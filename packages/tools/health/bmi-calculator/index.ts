import { defineTool, formatNumber } from '@utoolios/core'
import { bmiSchema } from './schema'
import { calculateBmi } from './calculator'

export default defineTool({
  config: {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    category: 'health',
    summary:
      'Calculate your Body Mass Index (BMI) from your height and weight, and see which category you fall into — free and instant.',
    tags: ['bmi', 'body mass index', 'health', 'weight', 'fitness'],
    serverSide: false,
    tier: 'silver',
    status: 'published',
    publishedAt: '2026-07-21',
    flags: { ads: true, showRelated: true, showArticle: true, showFaq: true },
  },
  inputSchema: bmiSchema,
  inputFields: [
    { name: 'weightKg', label: 'Weight', kind: 'number', unit: 'kg', defaultValue: 70, min: 1, max: 500, step: 0.1 },
    { name: 'heightCm', label: 'Height', kind: 'number', unit: 'cm', defaultValue: 175, min: 50, max: 300, step: 0.1 },
  ],
  calculate: calculateBmi,
  present: (output) => [
    { label: 'Your BMI', value: formatNumber(output.bmi, 1), primary: true },
    { label: 'Category', value: output.category },
  ],
  related: ['calorie-tdee-calculator'],
  examples: [
    {
      label: '70 kg, 175 cm',
      input: { weightKg: 70, heightCm: 175 },
      expected: { bmi: 22.857142857142858, category: 'Normal' },
    },
  ],
  content: {
    explanation:
      'BMI is your weight in kilograms divided by the square of your height in metres. It is a quick screening measure, not a diagnosis.',
    assumptions: [
      'BMI does not distinguish muscle from fat.',
      'Standard adult categories are used (WHO).',
      'Not validated for children, athletes, or pregnancy.',
    ],
    article:
      '## Understanding your BMI\n\nBody Mass Index is calculated as `BMI = weight(kg) / height(m)²`. It places adults into broad categories — underweight, normal, overweight, and obese — as a fast, rough screen. Because it ignores body composition, a muscular person can register as "overweight" despite low body fat. Treat BMI as one signal among many.',
    faq: [
      {
        q: 'Is BMI accurate for athletes?',
        a: 'Not always. BMI cannot tell muscle from fat, so very muscular people may score high without excess fat.',
      },
      {
        q: 'What is a healthy BMI range?',
        a: 'For most adults, a BMI between 18.5 and 24.9 is considered the normal range.',
      },
    ],
  },
})
