/**
 * Shared, pure formatting helpers (docs/00 DRY). One source of truth for how
 * numbers/currency are displayed across all tools. Framework-free.
 */

export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number, maximumFractionDigits = 1): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(value)
}
