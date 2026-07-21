import { describe, it, expect } from 'vitest'
import { countWords } from './calculator'

describe('word-counter', () => {
  it('counts words, characters, and sentences', () => {
    const result = countWords({ text: 'Hello world.' })
    expect(result.characters).toBe(12)
    expect(result.charactersNoSpaces).toBe(11)
    expect(result.words).toBe(2)
    expect(result.sentences).toBe(1)
  })

  it('returns zeros for empty input', () => {
    const result = countWords({ text: '   ' })
    expect(result.words).toBe(0)
    expect(result.sentences).toBe(0)
  })
})
