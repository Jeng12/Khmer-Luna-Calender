/**
 * TypeScript interfaces for Khmer Lunar Calendar data structures.
 * These match the API response shapes from the Laravel backend.
 */

// ── Lunar Date ─────────────────────────────────────────────────────────────

export interface KhmerDate {
  gregorian_date:  string;   // "2026-05-25"
  lunar_day:       number;   // 1–15 (each half-month)
  lunar_day_km:    string;   // Khmer numeral glyph
  lunar_month:     string;   // English: "Visak"
  lunar_month_km:  string;   // Khmer: "ពិសាខ"
  lunar_phase:     'កើត' | 'រោច';  // Kaet (waxing) | Roch (waning)
  moon_phase:      string;   // emoji: 🌑🌒🌓🌔🌕🌖🌗🌘
  buddhist_era:    number;   // Gregorian year + 544
  zodiac_year_km:  string;   // e.g. "មមែ"
  zodiac_year_en:  string;   // e.g. "Snake"
  is_auspicious:   boolean;
}

// ── Calendar Day (grid cell) ───────────────────────────────────────────────

export interface CalendarDay extends KhmerDate {
  day:              number;   // 1–31
  day_of_week:      number;   // 0=Sun … 6=Sat
  is_holiday:       boolean;
  holiday_name_km?: string;
  holiday_name_en?: string;
}

// ── Month Data ─────────────────────────────────────────────────────────────

export interface MonthData {
  year:  number;
  month: number;    // 1–12
  days:  CalendarDay[];
}

// ── Holiday ───────────────────────────────────────────────────────────────

export interface Holiday {
  id:              number;
  name_km:         string;
  name_en:         string;
  description_km?: string;
  description_en?: string;
  gregorian_date:  string;
  lunar_month?:    number;
  lunar_day?:      number;
  type:            'national' | 'buddhist' | 'royal';
  is_public:       boolean;
}

// ── Auspicious Day ────────────────────────────────────────────────────────

export interface AuspiciousDay extends KhmerDate {
  ceremony_types: AuspiciousType[];
}

export type AuspiciousType =
  | 'ពិធីមង្គលការ'   // Wedding
  | 'ចូលផ្ទះ'         // House entering
  | 'ឈ្មួញ'           // Business
  | 'ធ្វើដំណើរ'       // Travel
  | 'ការសិក្សា';      // Study

// ── Personal Event ────────────────────────────────────────────────────────

export interface PersonalEvent {
  id:             number;
  user_id:        number;
  title:          string;
  description?:   string;
  gregorian_date: string;
  khmer_date:     KhmerDate;
  moon_phase:     string;
  color:          string;
  created_at:     string;
  updated_at:     string;
}

// ── API Response envelope ─────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data:    T;
  message?: string;
}
