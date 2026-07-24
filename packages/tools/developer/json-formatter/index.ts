import { defineTool, formatNumber } from '@utoolios/core'
import { jsonFormatterSchema } from './schema'
import { formatJson } from './calculator'

/**
 * JSON Formatter (docs/13 assembles the plugin). Pretty-prints and minifies
 * JSON entirely in the browser — your data is never sent to a server.
 */
export default defineTool({
  config: {
    id: 'json-formatter',
    title: 'JSON Formatter',
    category: 'developer',
    summary:
      'Format, validate, and minify JSON instantly — free, private, and works entirely in your browser.',
    tags: ['json', 'formatter', 'validator', 'minify', 'developer'],
    serverSide: false,
    tier: 'silver',
    status: 'published',
    publishedAt: '2026-07-24',
    flags: { ads: true, showRelated: true, showArticle: true, showFaq: true },
  },
  inputSchema: jsonFormatterSchema,
  inputFields: [
    {
      name: 'json',
      label: 'JSON',
      kind: 'text',
      placeholder: 'Paste your JSON…',
      defaultValue: '{"name":"UToolios","tools":3,"free":true}',
    },
    { name: 'indent', label: 'Indent', kind: 'number', unit: 'spaces', defaultValue: 2, min: 0, max: 8, step: 1 },
  ],
  calculate: formatJson,
  present: (output) => [
    { label: 'Status', value: 'Valid JSON', primary: true },
    { label: 'Keys', value: formatNumber(output.keyCount, 0) },
    { label: 'Formatted', value: output.formatted, wide: true },
    { label: 'Minified', value: output.minified, wide: true },
  ],
  related: ['jwt-decoder', 'base64-encoder-decoder'],
  examples: [
    {
      label: '{"name":"UToolios","tools":3}',
      input: { json: '{"name":"UToolios","tools":3}', indent: 2 },
      expected: {
        formatted: '{\n  "name": "UToolios",\n  "tools": 3\n}',
        minified: '{"name":"UToolios","tools":3}',
        keyCount: 2,
      },
    },
  ],
  content: {
    explanation:
      'Your JSON is parsed and re-serialized entirely in your browser — nothing is sent to a server, so even sensitive data stays private.',
    assumptions: [
      'Input must be valid JSON (a syntax error will be flagged).',
      'Key order is preserved from your input.',
      'Minified output removes all non-essential whitespace.',
    ],
    article:
      '## Formatting and validating JSON\n\nThis tool parses your input with the standard JSON parser and re-serializes it with your chosen indent, which both validates it and makes it readable. The minified version strips all non-essential whitespace, which is useful for shrinking payloads before sending them over the network.',
    faq: [
      {
        q: 'Why does it say my JSON is invalid?',
        a: 'JSON has strict syntax — trailing commas, single quotes, and unquoted keys are not valid JSON. Check for these common mistakes.',
      },
      {
        q: 'Is my data sent anywhere?',
        a: 'No. Formatting happens entirely in your browser. Your JSON never leaves your device.',
      },
    ],
  },
})
