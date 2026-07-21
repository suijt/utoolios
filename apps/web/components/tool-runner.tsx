'use client'

import { useState } from 'react'
import type { ResultLine } from '@utoolios/core'
import { ResultCard } from '@utoolios/ui'
import { getToolById } from '@utoolios/tools'

/**
 * The interactive island (docs/10 §2). The ONLY client-side JavaScript on a tool
 * page. Generic: it renders any tool's inputs from `inputFields`, validates with
 * the tool's Zod schema, and computes instantly on every change (docs/02 C3).
 */
export function ToolRunner({ toolId }: { toolId: string }) {
  const tool = getToolById(toolId)
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(toolId))

  if (!tool) return null

  const coerced = coerce(tool.inputFields, values)
  const parsed = tool.inputSchema.safeParse(coerced)

  let lines: readonly ResultLine[] | null = null
  let error: string | null = null
  if (parsed.success) {
    const output = tool.calculate(parsed.data)
    lines = tool.present(output, parsed.data)
  } else {
    error = parsed.error.issues[0]?.message ?? 'Please check your inputs.'
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {tool.inputFields.map((field) => {
          const inputId = `field-${field.name}`
          return (
            <div key={field.name}>
              <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {field.label}
                {field.unit ? <span className="ml-1 text-gray-400">({field.unit})</span> : null}
              </label>
              {field.kind === 'select' ? (
                <select
                  id={inputId}
                  value={values[field.name] ?? ''}
                  onChange={(event) => update(field.name, event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                >
                  {(field.options ?? []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={inputId}
                  type={field.kind === 'number' ? 'number' : 'text'}
                  inputMode={field.kind === 'number' ? 'decimal' : undefined}
                  value={values[field.name] ?? ''}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  placeholder={field.placeholder}
                  onChange={(event) => update(field.name, event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                />
              )}
            </div>
          )
        })}
      </div>

      {lines ? (
        <ResultCard lines={lines} />
      ) : (
        <p role="alert" className="rounded-card bg-error/10 p-4 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )

  function update(name: string, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }))
  }
}

function initialValues(toolId: string): Record<string, string> {
  const tool = getToolById(toolId)
  const values: Record<string, string> = {}
  if (!tool) return values
  for (const field of tool.inputFields) {
    values[field.name] = field.defaultValue === undefined ? '' : String(field.defaultValue)
  }
  return values
}

function coerce(
  fields: readonly { name: string; kind: string }[],
  values: Record<string, string>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const field of fields) {
    const raw = values[field.name] ?? ''
    if (field.kind === 'number') {
      result[field.name] = raw === '' ? Number.NaN : Number(raw)
    } else {
      result[field.name] = raw
    }
  }
  return result
}
