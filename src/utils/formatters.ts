export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD', maximumFractionDigits: 2}).format(amount);
}

export function formatPercentage(amount: number): string {
  return new Intl.NumberFormat('en-AU', {style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(amount / 100);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-AU').format(amount);
}