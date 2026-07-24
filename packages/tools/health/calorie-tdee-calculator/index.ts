import { defineTool, formatNumber } from '@utoolios/core'
import { tdeeSchema } from './schema'
import { calculateTdee } from './calculator'

/**
 * Calorie / TDEE Calculator (docs/13 assembles the plugin). Estimates daily
 * calorie needs using the Mifflin-St Jeor equation.
 */
export default defineTool({
  config: {
    id: 'calorie-tdee-calculator',
    title: 'Calorie & TDEE Calculator',
    category: 'health',
    summary:
      'Estimate your Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR) from your body stats and activity level — free and instant.',
    tags: ['tdee', 'calories', 'bmr', 'health', 'fitness'],
    serverSide: false,
    tier: 'silver',
    status: 'published',
    publishedAt: '2026-07-24',
    flags: { ads: true, showRelated: true, showArticle: true, showFaq: true },
  },
  inputSchema: tdeeSchema,
  inputFields: [
    {
      name: 'sex',
      label: 'Sex',
      kind: 'select',
      defaultValue: 'male',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    },
    { name: 'age', label: 'Age', kind: 'number', unit: 'years', defaultValue: 30, min: 15, max: 120, step: 1 },
    { name: 'weightKg', label: 'Weight', kind: 'number', unit: 'kg', defaultValue: 70, min: 1, max: 500, step: 0.1 },
    { name: 'heightCm', label: 'Height', kind: 'number', unit: 'cm', defaultValue: 175, min: 50, max: 300, step: 0.1 },
    {
      name: 'activityLevel',
      label: 'Activity level',
      kind: 'select',
      defaultValue: 'moderate',
      options: [
        { label: 'Sedentary (little or no exercise)', value: 'sedentary' },
        { label: 'Light (1-3 days/week)', value: 'light' },
        { label: 'Moderate (3-5 days/week)', value: 'moderate' },
        { label: 'Active (6-7 days/week)', value: 'active' },
        { label: 'Very active (physical job or 2x/day)', value: 'very_active' },
      ],
    },
  ],
  calculate: calculateTdee,
  present: (output) => [
    { label: 'Daily calories (TDEE)', value: `${formatNumber(output.tdee, 0)} kcal`, primary: true },
    { label: 'Base metabolic rate (BMR)', value: `${formatNumber(output.bmr, 0)} kcal` },
  ],
  related: ['bmi-calculator'],
  examples: [
    {
      label: 'Male, 30, 70kg, 175cm, moderately active',
      input: { sex: 'male', age: 30, weightKg: 70, heightCm: 175, activityLevel: 'moderate' },
      expected: { bmr: 1648.75, tdee: 2555.5625 },
    },
  ],
  content: {
    explanation:
      'TDEE estimates the total calories you burn per day, combining your Basal Metabolic Rate (calories burned at rest) with an activity multiplier for how much you move.',
    assumptions: [
      'Uses the Mifflin-St Jeor equation, widely considered one of the most accurate BMR formulas.',
      'Activity level is a rough multiplier, not a precise measurement.',
      'Not validated for pregnancy, elite athletes, or clinical conditions.',
    ],
    article:
      '## How TDEE is calculated\n\nBasal Metabolic Rate (BMR) is estimated with the Mifflin-St Jeor equation: `10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5` for men, or `− 161` instead of `+ 5` for women. Total Daily Energy Expenditure (TDEE) multiplies BMR by an activity factor ranging from 1.2 (sedentary) to 1.9 (very active) to estimate total daily calorie burn — a useful starting point for weight management.',
    faq: [
      {
        q: 'Should I eat exactly my TDEE?',
        a: 'Eating at your TDEE tends to maintain your current weight. Eating below it typically leads to weight loss, and above it to weight gain — but individual metabolism varies.',
      },
      {
        q: 'Which activity level should I pick?',
        a: 'Be honest about your typical week, not your best week. Most people with a desk job and occasional exercise fall in the "light" to "moderate" range.',
      },
    ],
  },
})
