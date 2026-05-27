/**
 * Khmer Lunar Calendar — Design Tokens
 *
 * Warm Night · Lotus Gold · Khmer Heritage palette.
 * All colors, typography scales, and spacing values used throughout the app.
 */

// ── Colors ────────────────────────────────────────────────────────────────

export const Colors = {
  // Backgrounds
  night:   '#0D0A0F',   // App background
  deep:    '#120E16',   // Tab bar, nav header
  surface: '#1A1520',   // Input fields, secondary bg
  card:    '#221C2A',   // Cards, list items

  // Borders / muted
  border:  '#2E2538',
  muted:   '#3D3349',

  // Text
  text:    '#F5EDD8',   // Default body text
  sub:     '#9B8E7A',   // Secondary / caption
  dim:     '#5A5060',   // Placeholder, disabled

  // Accent palette
  gold:    '#C8973A',   // Primary accent (Khmer calendar, highlights)
  goldL:   '#E8B84B',   // Lighter gold for large numbers
  crimson: '#C0392B',   // Weekend days, holidays, destructive
  lotus:   '#E8768A',   // Buddhist events, holidays
  jade:    '#4DAF7C',   // Auspicious days
  moon:    '#F2E8C6',   // Heading / title text
  sky:     '#7BA7BC',   // Activity stack accent
} as const;

export type ColorKey = keyof typeof Colors;

// ── Typography ─────────────────────────────────────────────────────────────

export const Fonts = {
  khmer:  'NotoSerifKhmer',   // All Khmer-script text
  latin:  'Battambang',       // Latin body text (also supports Khmer)
  mono:   'DMMonoMedium',     // Numbers, labels, code
} as const;

export const FontSize = {
  xs:   8,
  sm:   10,
  base: 12,
  md:   14,
  lg:   16,
  xl:   18,
  xxl:  22,
  hero: 28,
} as const;

export const FontWeight = {
  regular:   '400',
  medium:    '500',
  semibold:  '600',
  bold:      '700',
  extrabold: '800',
} as const;

// ── Spacing ────────────────────────────────────────────────────────────────

export const Spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   24,
  xxl:  32,
  page: 20,   // Default horizontal page padding
} as const;

// ── Border Radius ──────────────────────────────────────────────────────────

export const Radius = {
  sm:  6,
  md:  10,
  lg:  14,
  xl:  18,
  pill: 999,
} as const;

// ── Shadows ────────────────────────────────────────────────────────────────

export const Shadow = {
  gold: {
    shadowColor:   Colors.gold,
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius:  12,
    elevation:     8,
  },
  card: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius:  8,
    elevation:     4,
  },
} as const;
