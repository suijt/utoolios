/** Pure BMR/TDEE math using the Mifflin-St Jeor equation (docs/08 §4). */

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'

export interface TdeeInput {
  sex: 'male' | 'female'
  age: number
  weightKg: number
  heightCm: number
  activityLevel: ActivityLevel
}

export interface TdeeOutput {
  bmr: number
  tdee: number
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

export function calculateTdee(input: TdeeInput): TdeeOutput {
  const base = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age
  const bmr = input.sex === 'male' ? base + 5 : base - 161
  const tdee = bmr * ACTIVITY_MULTIPLIERS[input.activityLevel]
  return { bmr, tdee }
}
