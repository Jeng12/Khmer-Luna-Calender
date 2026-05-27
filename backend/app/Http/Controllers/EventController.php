<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\PersonalEvent;
use App\Services\KhmerCalendarService;

/**
 * EventController — CRUD for authenticated user's personal events.
 *
 * On POST /events the backend auto-maps gregorian_date → khmer_date
 * using KhmerCalendarService, storing a lunar snapshot at creation time.
 */
class EventController extends Controller
{
    public function __construct(protected KhmerCalendarService $calendar) {}

    // GET /api/events
    public function index(Request $request): JsonResponse
    {
        $events = $request->user()->personalEvents()->orderBy('gregorian_date')->get();
        return response()->json(['success' => true, 'data' => $events]);
    }

    // POST /api/events
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title'          => 'required|string|max:255',
            'gregorian_date' => 'required|date_format:Y-m-d',
            'description'    => 'nullable|string',
            'color'          => 'nullable|string|size:7',
        ]);

        $date      = Carbon::parse($request->gregorian_date);
        $khmerDate = $this->calendar->toKhmer($date);

        $event = $request->user()->personalEvents()->create([
            'title'          => $request->title,
            'gregorian_date' => $request->gregorian_date,
            'description'    => $request->description,
            'khmer_date'     => $khmerDate,
            'moon_phase'     => $khmerDate['moon_phase'] ?? null,
            'color'          => $request->color ?? '#C8973A',
        ]);

        return response()->json(['success' => true, 'data' => $event], 201);
    }

    // GET /api/events/{id}
    public function show(Request $request, int $id): JsonResponse
    {
        $event = $request->user()->personalEvents()->findOrFail($id);
        return response()->json(['success' => true, 'data' => $event]);
    }

    // PUT /api/events/{id}
    public function update(Request $request, int $id): JsonResponse
    {
        $event = $request->user()->personalEvents()->findOrFail($id);

        $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'color'       => 'nullable|string|size:7',
        ]);

        $event->update($request->only('title', 'description', 'color'));

        return response()->json(['success' => true, 'data' => $event]);
    }

    // DELETE /api/events/{id}
    public function destroy(Request $request, int $id): JsonResponse
    {
        $request->user()->personalEvents()->findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Deleted']);
    }
}
