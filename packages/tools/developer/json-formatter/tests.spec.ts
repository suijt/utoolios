import { describe, it, expect } from 'vitest'
import { formatJson } from './calculator'

describe('json-formatter', () => {
  it('pretty-prints JSON with the requested indent', () => {
    const result = formatJson({ json: '{"name":"UToolios","tools":3}', indent: 2 })
    expect(result.formatted).toBe('{\n  "name": "UToolios",\n  "tools": 3\n}')
    expect(result.minified).toBe('{"name":"UToolios","tools":3}')
    expect(result.keyCount).toBe(2)
  })

  it('counts keys across nested objects and arrays', () => {
    const result = formatJson({ json: '{"a":1,"b":{"c":2},"d":[{"e":3},{"f":4}]}', indent: 2 })
    expect(result.keyCount).toBe(6)
  })
})
