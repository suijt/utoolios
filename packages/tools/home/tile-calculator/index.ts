import { defineTool, formatNumber } from '@utoolios/core'
import { tileCalculatorSchema } from './schema'
import { calculateTiles } from './calculator'

/**
 * Tile Calculator (docs/13 assembles the plugin). Estimates how many tiles you
 * need for a floor or wall, including a wastage allowance for cuts and breakage.
 */
export default defineTool({
  config: {
    id: 'tile-calculator',
    title: 'Tile Calculator',
    category: 'home',
    summary:
      'Calculate how many tiles you need for a room, including extra for cuts and breakage — free and instant.',
    tags: ['tile', 'flooring', 'home', 'renovation'],
    serverSide: false,
    tier: 'silver',
    status: 'published',
    publishedAt: '2026-07-24',
    flags: { ads: true, showRelated: true, showArticle: true, showFaq: true },
  },
  inputSchema: tileCalculatorSchema,
  inputFields: [
    { name: 'roomLength', label: 'Room length', kind: 'number', unit: 'm', defaultValue: 4, min: 0.1, max: 1000, step: 0.1 },
    { name: 'roomWidth', label: 'Room width', kind: 'number', unit: 'm', defaultValue: 3, min: 0.1, max: 1000, step: 0.1 },
    { name: 'tileLength', label: 'Tile length', kind: 'number', unit: 'cm', defaultValue: 60, min: 1, max: 1000, step: 1 },
    { name: 'tileWidth', label: 'Tile width', kind: 'number', unit: 'cm', defaultValue: 60, min: 1, max: 1000, step: 1 },
    { name: 'wastagePercent', label: 'Extra for cuts & breakage', kind: 'number', unit: '%', defaultValue: 10, min: 0, max: 100, step: 1 },
  ],
  calculate: calculateTiles,
  present: (output) => [
    { label: 'Tiles needed', value: formatNumber(output.tilesNeeded, 0), primary: true },
    { label: 'Room area', value: `${formatNumber(output.roomAreaM2, 2)} m²` },
    { label: 'Tile area', value: `${formatNumber(output.tileAreaM2, 4)} m²` },
  ],
  related: [],
  examples: [
    {
      label: '4m x 3m room, 60cm x 60cm tiles, 10% wastage',
      input: { roomLength: 4, roomWidth: 3, tileLength: 60, tileWidth: 60, wastagePercent: 10 },
      expected: { roomAreaM2: 12, tileAreaM2: 0.36, tilesNeeded: 37 },
    },
  ],
  content: {
    explanation:
      'We divide your room area by a single tile\'s area to find how many tiles fit, then add your wastage percentage to cover cuts, breakage, and future repairs.',
    assumptions: [
      'Assumes a simple rectangular room with no allowance for offsets or patterns.',
      'Rounds up to the nearest whole tile.',
      'Does not account for grout line width.',
    ],
    article:
      '## How the tile count is calculated\n\nRoom area (in m²) is your room\'s length times width. Each tile\'s area is its length times width (converted from centimeters to meters). Dividing room area by tile area gives the raw number of tiles needed; we then add your wastage percentage — typically 10% is enough for a simple layout, more for diagonal or complex patterns — and round up, since you can only buy whole tiles.',
    faq: [
      {
        q: 'How much wastage should I add?',
        a: 'A simple grid layout usually needs about 10%. Diagonal layouts, small rooms with many cuts, or a first-time DIY job often warrant 15-20%.',
      },
      {
        q: 'Does this account for grout lines?',
        a: 'No. Grout lines are thin enough to be a rounding error for most tile sizes, so this calculator ignores them for simplicity.',
      },
    ],
  },
})
