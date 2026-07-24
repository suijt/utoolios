import { defineTool } from '@utoolios/core'
import { jwtDecoderSchema } from './schema'
import { decodeJwt } from './calculator'

/**
 * JWT Decoder (docs/13 assembles the plugin). Decodes the header and payload of
 * a JSON Web Token entirely in the browser — it never verifies a signature and
 * your token is never sent to a server.
 */
export default defineTool({
  config: {
    id: 'jwt-decoder',
    title: 'JWT Decoder',
    category: 'developer',
    summary:
      'Decode and inspect a JSON Web Token (JWT) — see its header and payload instantly, entirely in your browser.',
    tags: ['jwt', 'json web token', 'decode', 'developer', 'auth'],
    serverSide: false,
    tier: 'silver',
    status: 'published',
    flags: { ads: true, showRelated: true, showArticle: true, showFaq: true },
  },
  inputSchema: jwtDecoderSchema,
  inputFields: [
    {
      name: 'token',
      label: 'JWT',
      kind: 'text',
      placeholder: 'Paste a JWT…',
      defaultValue:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  ],
  calculate: decodeJwt,
  present: (output) => [
    { label: 'Status', value: 'Valid JWT', primary: true },
    { label: 'Expires', value: output.expiresAt },
    { label: 'Header', value: output.header, wide: true },
    { label: 'Payload', value: output.payload, wide: true },
  ],
  related: ['json-formatter', 'base64-encoder-decoder'],
  examples: [
    {
      label: 'jwt.io example token',
      input: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
      expected: {
        header: '{\n  "alg": "HS256",\n  "typ": "JWT"\n}',
        payload: '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}',
        expiresAt: 'N/A',
      },
    },
  ],
  content: {
    explanation:
      'A JWT has three base64url-encoded parts separated by dots: header, payload, and signature. This tool decodes the header and payload — it does not verify the signature, since that requires your server\'s secret key.',
    assumptions: [
      'Decoding only — the signature is never verified.',
      'Your token is decoded entirely in your browser and never sent anywhere.',
      'Standard JWTs (base64url-encoded JSON header and payload) are supported.',
    ],
    article:
      '## Understanding a JWT\n\nA JSON Web Token is three base64url-encoded segments joined by dots: `header.payload.signature`. The header states the signing algorithm, the payload carries the claims (like `sub`, `iat`, and `exp`), and the signature lets a server verify the token hasn\'t been tampered with — but only if you have the secret or public key. This tool decodes the readable parts so you can inspect a token\'s contents without needing that key.',
    faq: [
      {
        q: 'Can this verify if a token is valid or forged?',
        a: 'No. Verifying a signature requires the secret (or public) key used to sign it. This tool only decodes the readable header and payload.',
      },
      {
        q: 'Is my token sent to a server?',
        a: 'No. Decoding happens entirely in your browser using standard base64url decoding — your token never leaves your device.',
      },
    ],
  },
})
