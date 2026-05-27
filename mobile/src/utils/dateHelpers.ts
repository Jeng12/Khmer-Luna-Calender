/**
 * Date helper utilities for the Khmer Lunar Calendar app.
 *
 * All heavy lunar math is done server-side via the Laravel API.
 * These helpers handle display formatting and client-side date manipulation.
 */

/** Format a JS Date to "YYYY-MM-DD" (API format) */
export function toApiDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Pad a day/month number to 2 digits */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Return the first day-of-week (0=Sun) for the given month.
 * Used to calculate the leading empty cells in the calendar grid.
 */
export function firstDayOfMonth(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}

/** Return the number of days in a Gregorian month. */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** Advance year/month by +1 or -1, wrapping correctly. */
export function shiftMonth(
  year: number,
  month: number,
  delta: 1 | -1
): { year: number; month: number } {
  let m = month + delta;
  let y = year;
  if (m > 12) { m = 1;  y += 1; }
  if (m < 1)  { m = 12; y -= 1; }
  return { year: y, month: m };
}

/** Human-readable countdown: "in 3 days", "today", "yesterday". */
export function daysUntil(dateStr: string): string {
  const target = new Date(dateStr).setHours(0, 0, 0, 0);
  const today  = new Date().setHours(0, 0, 0, 0);
  const diff   = Math.round((target - today) / 86_400_000);

  if (diff === 0)  return 'today';
  if (diff === 1)  return 'tomorrow';
  if (diff === -1) return 'yesterday';
  if (diff > 1)    return `in ${diff} days`;
  return `${Math.abs(diff)} days ago`;
}

/** Khmer numeral mapping (0–9 → ០–៩). */
const KH_DIGITS = ['០','១','២','៣','៤','៥','៦','៧','៨','៩'];

export function toKhmerNumeral(n: number): string {
  return String(n)
    .split('')
    .map(d => KH_DIGITS[parseInt(d, 10)] ?? d)
    .join('');
}
