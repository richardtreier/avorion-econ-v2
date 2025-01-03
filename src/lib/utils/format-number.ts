export function formatNumber(number: number): string {
  return Intl.NumberFormat('en-US').format(number);
}
