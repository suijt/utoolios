import { describe, it, expect } from 'vitest'
import { convertBase64 } from './calculator'

describe('base64-encoder-decoder', () => {
  it('encodes text to Base64', () => {
    const result = convertBase64({ text: 'Hello, UToolios!', mode: 'encode' })
    expect(result.result).toBe('SGVsbG8sIFVUb29saW9zIQ==')
  })

  it('decodes Base64 back to text', () => {
    const result = convertBase64({ text: 'SGVsbG8sIFVUb29saW9zIQ==', mode: 'decode' })
    expect(result.result).toBe('Hello, UToolios!')
  })

  it('round-trips unicode text', () => {
    const encoded = convertBase64({ text: '你好', mode: 'encode' })
    const decoded = convertBase64({ text: encoded.result, mode: 'decode' })
    expect(decoded.result).toBe('你好')
  })
})
