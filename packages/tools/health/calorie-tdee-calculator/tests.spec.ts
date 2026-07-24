import { describe, it, expect } from 'vitest'
import { calculateTdee } from './calculator'

describe('calorie-tdee-calculator', () => {
  it('computes BMR and TDEE for a moderately active male', () => {
    const result = calculateTdee({
      sex: 'male',
      age: 30,
      weightKg: 70,
      heightCm: 175,
      activityLevel: 'moderate',
    })
    expect(result.bmr).toBe(1648.75)
    expect(Math.round(result.tdee * 100) / 100).toBe(2555.56)
  })

  it('applies the female offset and sedentary multiplier', () => {
    const result = calculateTdee({
      sex: 'female',
      age: 30,
      weightKg: 60,
      heightCm: 165,
      activityLevel: 'sedentary',
    })
    const expectedBmr = 10 * 60 + 6.25 * 165 - 5 * 30 - 161
    expect(result.bmr).toBe(expectedBmr)
    expect(result.tdee).toBe(expectedBmr * 1.2)
  })
})
