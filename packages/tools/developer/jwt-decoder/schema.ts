import { z } from 'zod'
import type { JwtDecoderInput } from './calculator'
import { base64UrlDecode } from './calculator'

/** Boundary validation (docs/08 §3): confirms the token decodes and parses before `calculate` ever runs. */
export const jwtDecoderSchema: z.ZodType<JwtDecoderInput> = z.object({
  token: z.string().refine(isDecodableJwt, {
    message: 'Enter a valid JWT (header and payload must be base64url-encoded JSON).',
  }),
})

function isDecodableJwt(token: string): boolean {
  const parts = token.trim().split('.')
  if (parts.length < 2) return false
  try {
    JSON.parse(base64UrlDecode(parts[0] ?? ''))
    JSON.parse(base64UrlDecode(parts[1] ?? ''))
    return true
  } catch {
    return false
  }
}
