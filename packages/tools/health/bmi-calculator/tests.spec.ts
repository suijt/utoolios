import { describe, it, expect } from 'vitest'
import { calculateBmi } from './calculator'

describe('bmi-calculator', () => {
  it('computes BMI and classifies normal weight', () => {
    const result = calculateBmi({ weightKg: 70, heightCm: 175 })
    expect(Number(result.bmi.toFixed(1))).toBe(22.9)
    expect(result.category).toBe('Normal')
  })

  it('classifies category boundaries', () => {
    expect(calculateBmi({ weightKg: 45, heightCm: 175 }).category).toBe('Underweight')
    expect(calculateBmi({ weightKg: 85, heightCm: 175 }).category).toBe('Overweight')
    expect(calculateBmi({ weightKg: 100, heightCm: 175 }).category).toBe('Obese')
  })
})
