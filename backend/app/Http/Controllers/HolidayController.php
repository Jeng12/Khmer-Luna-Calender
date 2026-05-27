<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Holiday;

class HolidayController extends Controller
{
    // GET /api/holidays?year=2026&type=buddhist&public_only=true
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'year'        => 'nullable|integer',
            'type'        => 'nullable|in:national,buddhist,royal',
            'public_only' => 'nullable|boolean',
        ]);

        $query = Holiday::query();

        if ($request->filled('year')) {
            $query->whereYear('gregorian_date', $request->year);
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->boolean('public_only')) {
            $query->where('is_public', true);
        }

        $holidays = $query->orderBy('gregorian_date')->get();

        return response()->json(['success' => true, 'data' => $holidays]);
    }

    // GET /api/holidays/{id}
    public function show(int $id): JsonResponse
    {
        $holiday = Holiday::findOrFail($id);
        return response()->json(['success' => true, 'data' => $holiday]);
    }

    // POST /api/holidays  (admin only — add middleware in route or here)
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name_km'        => 'required|string',
            'name_en'        => 'required|string',
            'gregorian_date' => 'required|date_format:Y-m-d',
            'type'           => 'required|in:national,buddhist,royal',
            'is_public'      => 'boolean',
        ]);

        $holiday = Holiday::create($request->only([
            'name_km', 'name_en', 'description_km', 'description_en',
            'gregorian_date', 'lunar_month', 'lunar_day', 'type', 'is_public',
        ]));

        return response()->json(['success' => true, 'data' => $holiday], 201);
    }
}
