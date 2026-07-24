/** Pure Base64 encode/decode (docs/08 §4). No framework, no I/O. */

export interface Base64Input {
  text: string
  mode: 'encode' | 'decode'
}

export interface Base64Output {
  result: string
}

export function convertBase64(input: Base64Input): Base64Output {
  return { result: input.mode === 'encode' ? encodeBase64(input.text) : decodeBase64(input.text) }
}

export function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')
  return btoa(binary)
}

export function decodeBase64(value: string): string {
  const binary = atob(value)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}
