/** Pure BMI math (docs/08 §4). */

export interface BmiInput {
  weightKg: number
  heightCm: number
}

export type BmiCategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese'

export interface BmiOutput {
  bmi: number
  category: BmiCategory
}

export function calculateBmi(input: BmiInput): BmiOutput {
  const heightM = input.heightCm / 100
  const bmi = input.weightKg / (heightM * heightM)
  return { bmi, category: classify(bmi) }
}

function classify(bmi: number): BmiCategory {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}
