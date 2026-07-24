import { describe, it, expect } from 'vitest'
import { calculateTiles } from './calculator'

describe('tile-calculator', () => {
  it('computes tiles needed for a 4m x 3m room with 60cm x 60cm tiles and 10% wastage', () => {
    const result = calculateTiles({
      roomLength: 4,
      roomWidth: 3,
      tileLength: 60,
      tileWidth: 60,
      wastagePercent: 10,
    })
    expect(result.roomAreaM2).toBe(12)
    expect(result.tileAreaM2).toBe(0.36)
    expect(result.tilesNeeded).toBe(37)
  })

  it('rounds up to a whole tile even with zero wastage', () => {
    const result = calculateTiles({
      roomLength: 5,
      roomWidth: 5,
      tileLength: 33,
      tileWidth: 33,
      wastagePercent: 0,
    })
    expect(result.tilesNeeded).toBe(Math.ceil(25 / (0.33 * 0.33)))
  })
})
