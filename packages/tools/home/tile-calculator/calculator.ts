/** Pure tile quantity math (docs/08 §4). No framework, no I/O. */

export interface TileCalculatorInput {
  /** Room length in meters. */
  roomLength: number
  /** Room width in meters. */
  roomWidth: number
  /** Tile length in centimeters. */
  tileLength: number
  /** Tile width in centimeters. */
  tileWidth: number
  /** Extra tiles to buy for cuts and breakage, as a percentage. */
  wastagePercent: number
}

export interface TileCalculatorOutput {
  roomAreaM2: number
  tileAreaM2: number
  tilesNeeded: number
}

export function calculateTiles(input: TileCalculatorInput): TileCalculatorOutput {
  const roomAreaM2 = input.roomLength * input.roomWidth
  const tileAreaM2 = (input.tileLength / 100) * (input.tileWidth / 100)
  const rawTiles = roomAreaM2 / tileAreaM2
  const tilesNeeded = Math.ceil(rawTiles * (1 + input.wastagePercent / 100))
  return { roomAreaM2, tileAreaM2, tilesNeeded }
}
