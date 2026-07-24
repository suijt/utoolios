import { describe, it, expect } from 'vitest'
import { decodeJwt } from './calculator'

const SAMPLE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

describe('jwt-decoder', () => {
  it('decodes the header and payload of a standard JWT', () => {
    const result = decodeJwt({ token: SAMPLE_TOKEN })
    expect(JSON.parse(result.header)).toEqual({ alg: 'HS256', typ: 'JWT' })
    expect(JSON.parse(result.payload)).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    })
    expect(result.expiresAt).toBe('N/A')
  })

  it('reports an ISO expiry when the payload has an exp claim', () => {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
    const payload = Buffer.from(JSON.stringify({ exp: 1700000000 })).toString('base64url')
    const result = decodeJwt({ token: `${header}.${payload}.signature` })
    expect(result.expiresAt).toBe(new Date(1700000000 * 1000).toISOString())
  })
})
