/** Pure text-counting logic (docs/08 §4). Runs entirely in the browser (docs/02 C5). */

export interface WordCounterInput {
  text: string
}

export interface WordCounterOutput {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
}

export function countWords(input: WordCounterInput): WordCounterOutput {
  const text = input.text
  const trimmed = text.trim()
  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: trimmed === '' ? 0 : trimmed.split(/\s+/).length,
    sentences: trimmed === '' ? 0 : (trimmed.match(/[.!?]+/g) ?? []).length,
  }
}
