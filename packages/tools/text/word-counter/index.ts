import { defineTool, formatNumber } from '@utoolios/core'
import { wordCounterSchema } from './schema'
import { countWords } from './calculator'

export default defineTool({
  config: {
    id: 'word-counter',
    title: 'Word & Character Counter',
    category: 'text',
    summary:
      'Count words, characters, and sentences in your text instantly — free, private, and works entirely in your browser.',
    tags: ['word count', 'character count', 'text', 'counter'],
    serverSide: false,
    tier: 'bronze',
    status: 'published',
    flags: { ads: true, showRelated: false, showArticle: true, showFaq: true },
  },
  inputSchema: wordCounterSchema,
  inputFields: [
    { name: 'text', label: 'Your text', kind: 'text', placeholder: 'Paste or type your text…', defaultValue: '' },
  ],
  calculate: countWords,
  present: (output) => [
    { label: 'Words', value: formatNumber(output.words, 0), primary: true },
    { label: 'Characters', value: formatNumber(output.characters, 0) },
    { label: 'Characters (no spaces)', value: formatNumber(output.charactersNoSpaces, 0) },
    { label: 'Sentences', value: formatNumber(output.sentences, 0) },
  ],
  related: [],
  examples: [
    {
      label: 'Hello world.',
      input: { text: 'Hello world.' },
      expected: { characters: 12, charactersNoSpaces: 11, words: 2, sentences: 1 },
    },
  ],
  content: {
    explanation:
      'Counts are computed live in your browser as you type — your text is never sent to our servers.',
    assumptions: ['Words are separated by whitespace.', 'Sentences are counted by terminal punctuation (. ! ?).'],
    article:
      '## Counting words and characters\n\nThis tool splits your text on whitespace to count words and scans for sentence-ending punctuation to count sentences. Everything runs locally in your browser, so even long or sensitive text stays private.',
    faq: [
      {
        q: 'Is my text sent anywhere?',
        a: 'No. All counting happens in your browser. Your text never leaves your device.',
      },
    ],
  },
})
