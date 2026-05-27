<?php

namespace App\Services;

use Carbon\Carbon;
use Asorasoft\Chhankitek\Chhankitek;

/**
 * KhmerCalendarService
 *
 * Wraps the asorasoft/chhankitek package and provides clean,
 * bilingual (KM/EN) output for all calendar operations.
 *
 * Usage:
 *   $svc = app(KhmerCalendarService::class);
 *   $svc->toKhmer(Carbon::today());
 *   $svc->getMonthGrid(2026, 5);
 *   $svc->getMoonPhase(Carbon::today());
 *   $svc->getHolidays(2026);
 *   $svc->getAuspiciousDays(2026, 5);
 */
class KhmerCalendarService
{
    protected Chhankitek $chhankitek;

    public function __construct(Chhankitek $chhankitek)
    {
        $this->chhankitek = $chhankitek;
    }

    // ── Gregorian → Khmer ─────────────────────────────────────────────────

    /**
     * Convert a Gregorian date to full Khmer lunar info.
     *
     * @return array{
     *   gregorian_date: string,
     *   lunar_day: int,
     *   lunar_day_km: string,
     *   lunar_month: string,
     *   lunar_month_km: string,
     *   lunar_phase: string,         // 'កើត' | 'រោច'
     *   moon_phase: string,           // emoji glyph
     *   buddhist_era: int,
     *   zodiac_year_km: string,
     *   zodiac_year_en: string,
     *   is_auspicious: bool,
     * }
     */
    public function toKhmer(Carbon $date): array
    {
        // TODO: implement using $this->chhankitek
        // Placeholder structure — replace body once package is installed
        return [
            'gregorian_date'  => $date->toDateString(),
            'lunar_day'       => 0,
            'lunar_day_km'    => '',
            'lunar_month'     => '',
            'lunar_month_km'  => '',
            'lunar_phase'     => '',
            'moon_phase'      => '🌙',
            'buddhist_era'    => $date->year + 544,
            'zodiac_year_km'  => '',
            'zodiac_year_en'  => '',
            'is_auspicious'   => false,
        ];
    }

    // ── Monthly Grid ──────────────────────────────────────────────────────

    /**
     * Build a full monthly grid for the calendar view.
     * Result is cached for 24h keyed by "calendar_{year}_{month}".
     *
     * Each day entry contains all fields from toKhmer() plus:
     *   is_holiday: bool, holiday_name_km: ?string, holiday_name_en: ?string
     */
    public function getMonthGrid(int $year, int $month): array
    {
        $cacheKey = "calendar_{$year}_{$month}";

        return \Cache::remember($cacheKey, now()->addHours(24), function () use ($year, $month) {
            $days = [];
            $daysInMonth = Carbon::create($year, $month)->daysInMonth;

            for ($day = 1; $day <= $daysInMonth; $day++) {
                $date     = Carbon::create($year, $month, $day);
                $khmer    = $this->toKhmer($date);
                $holidays = $this->getHolidays($year);
                $isHoliday = collect($holidays)->contains('gregorian_date', $date->toDateString());

                $days[] = array_merge($khmer, [
                    'day'              => $day,
                    'day_of_week'      => $date->dayOfWeek,
                    'is_holiday'       => $isHoliday,
                    'holiday_name_km'  => null, // TODO: lookup
                    'holiday_name_en'  => null,
                ]);
            }

            return $days;
        });
    }

    // ── Moon Phase ────────────────────────────────────────────────────────

    /** Returns a moon phase emoji for the given date. */
    public function getMoonPhase(Carbon $date): string
    {
        // TODO: implement using chhankitek moon phase calculation
        return '🌙';
    }

    // ── Holidays ──────────────────────────────────────────────────────────

    /** Return all Cambodian holidays for a given year. */
    public function getHolidays(int $year): array
    {
        // TODO: implement using chhankitek + holidays table
        return [];
    }

    // ── Auspicious Days ───────────────────────────────────────────────────

    /** Return auspicious days for a given month/year with ceremony tags. */
    public function getAuspiciousDays(int $year, int $month): array
    {
        // TODO: implement using chhankitek auspicious day calculation
        return [];
    }
}
