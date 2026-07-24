/** Pure JWT decoding (docs/08 §4). Decodes only — never verifies a signature. */

export interface JwtDecoderInput {
  token: string
}

export interface JwtDecoderOutput {
  header: string
  payload: string
  expiresAt: string
}

export function decodeJwt(input: JwtDecoderInput): JwtDecoderOutput {
  const parts = input.token.trim().split('.')
  const header = JSON.parse(base64UrlDecode(parts[0] ?? ''))
  const payload = JSON.parse(base64UrlDecode(parts[1] ?? ''))
  const expiresAt = typeof payload.exp === 'number' ? new Date(payload.exp * 1000).toISOString() : 'N/A'

  return {
    header: JSON.stringify(header, null, 2),
    payload: JSON.stringify(payload, null, 2),
    expiresAt,
  }
}

/** Decodes a base64url JWT segment to a UTF-8 string. Shared with schema.ts's validity check. */
export function base64UrlDecode(segment: string): string {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}
