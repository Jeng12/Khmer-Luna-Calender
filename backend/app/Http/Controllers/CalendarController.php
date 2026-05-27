<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\KhmerCalendarService;

/**
 * CalendarController
 *
 * Handles all calendar-related API endpoints.
 * All responses use the envelope: { success: bool, data: mixed }
 * Bilingual output driven by Accept-Language header (km | en).
 */
class CalendarController extends Controller
{
    public function __construct(
        protected KhmerCalendarService $calendar
    ) {}

    // GET /api/calendar/today
    public function today(): JsonResponse
    {
        $today  = Carbon::today();
        $khmer  = $this->calendar->toKhmer($today);

        return response()->json([
            'success' => true,
            'data'    => $khmer,
        ]);
    }

    // GET /api/calendar/{year}/{month}
    public function month(int $year, int $month): JsonResponse
    {
        $grid = $this->calendar->getMonthGrid($year, $month);

        return response()->json([
            'success' => true,
            'data'    => [
                'year'  => $year,
                'month' => $month,
                'days'  => $grid,
            ],
        ]);
    }

    // POST /api/calendar/convert
    // Body: { gregorian_date: "2026-05-25" }
    public function convert(Request $request): JsonResponse
    {
        $request->validate([
            'gregorian_date' => 'required|date_format:Y-m-d',
        ]);

        $date  = Carbon::parse($request->gregorian_date);
        $khmer = $this->calendar->toKhmer($date);

        return response()->json([
            'success' => true,
            'data'    => $khmer,
        ]);
    }

    // GET /api/calendar/auspicious-days?year=2026&month=5
    public function auspiciousDays(Request $request): JsonResponse
    {
        $request->validate([
            'year'  => 'required|integer|min:1900|max:2200',
            'month' => 'required|integer|min:1|max:12',
        ]);

        $days = $this->calendar->getAuspiciousDays(
            (int) $request->year,
            (int) $request->month
        );

        return response()->json([
            'success' => true,
            'data'    => $days,
        ]);
    }
}
