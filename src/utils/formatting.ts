// Formatting utilities for HarchOS bot responses
// Keeps the output clean and readable

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function statusEmoji(status: string): string {
  const normalized = status.toLowerCase().trim();
  switch (normalized) {
    case 'online':
    case 'healthy':
    case 'operational':
      return '🟢';
    case 'degraded':
    case 'warning':
    case 'partial':
      return '🟡';
    case 'offline':
    case 'down':
    case 'critical':
      return '🔴';
    default:
      return '⚪';
  }
}
