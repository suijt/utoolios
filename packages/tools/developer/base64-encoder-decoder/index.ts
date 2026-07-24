import { defineTool } from '@utoolios/core'
import { base64Schema } from './schema'
import { convertBase64 } from './calculator'

/**
 * Base64 Encoder/Decoder (docs/13 assembles the plugin). Converts text to and
 * from Base64 entirely in the browser.
 */
export default defineTool({
  config: {
    id: 'base64-encoder-decoder',
    title: 'Base64 Encoder/Decoder',
    category: 'developer',
    summary: 'Encode text to Base64 or decode Base64 back to text — free, instant, and works entirely in your browser.',
    tags: ['base64', 'encode', 'decode', 'developer'],
    serverSide: false,
    tier: 'silver',
    status: 'published',
    publishedAt: '2026-07-24',
    flags: { ads: true, showRelated: true, showArticle: true, showFaq: true },
  },
  inputSchema: base64Schema,
  inputFields: [
    { name: 'text', label: 'Text', kind: 'text', placeholder: 'Enter text to encode or decode…', defaultValue: 'Hello, UToolios!' },
    {
      name: 'mode',
      label: 'Mode',
      kind: 'select',
      defaultValue: 'encode',
      options: [
        { label: 'Encode to Base64', value: 'encode' },
        { label: 'Decode from Base64', value: 'decode' },
      ],
    },
  ],
  calculate: convertBase64,
  present: (output, input) => [
    { label: 'Status', value: input.mode === 'encode' ? 'Encoded' : 'Decoded', primary: true },
    { label: 'Result', value: output.result, wide: true },
  ],
  related: ['jwt-decoder', 'json-formatter'],
  examples: [
    {
      label: 'Encode "Hello, UToolios!"',
      input: { text: 'Hello, UToolios!', mode: 'encode' },
      expected: { result: 'SGVsbG8sIFVUb29saW9zIQ==' },
    },
  ],
  content: {
    explanation:
      'Base64 encodes any text as a set of 64 printable characters, which makes binary-safe data easy to embed in JSON, URLs, or email. It is an encoding, not encryption — anyone can decode it back.',
    assumptions: [
      'Text is encoded as UTF-8 before Base64 conversion.',
      'This is an encoding, not encryption — it provides no security or privacy.',
      'Decoding invalid Base64 text will show a validation error.',
    ],
    article:
      '## What Base64 is for\n\nBase64 represents binary data using only 64 printable ASCII characters (A–Z, a–z, 0–9, +, /), which makes it safe to embed in text-based formats like JSON, XML, or URLs. It is commonly used for embedding images in CSS/HTML, encoding auth tokens, and passing binary data through text-only systems. Because it is reversible with no key, it should never be used to protect sensitive data.',
    faq: [
      {
        q: 'Is Base64 encryption?',
        a: 'No. Base64 is an encoding, not encryption. Anyone can decode it back to the original text — it provides no confidentiality.',
      },
      {
        q: 'Why did decoding fail?',
        a: 'The text you entered isn\'t valid Base64. Valid Base64 only contains A–Z, a–z, 0–9, +, /, and = padding.',
      },
    ],
  },
})
