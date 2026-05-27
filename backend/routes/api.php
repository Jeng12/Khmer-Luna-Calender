<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Khmer Lunar Calendar — API Routes
|--------------------------------------------------------------------------
| 18 endpoints across 5 resource groups.
| All protected routes require: Authorization: Bearer {sanctum_token}
| Bilingual output via: Accept-Language: km   (defaults to 'en')
*/

// ── Auth ──────────────────────────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
    Route::post('/logout',   [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

// ── Protected routes ──────────────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Calendar
    Route::prefix('calendar')->group(function () {
        Route::get('/today',                    [CalendarController::class, 'today']);
        Route::get('/{year}/{month}',           [CalendarController::class, 'month']);
        Route::post('/convert',                 [CalendarController::class, 'convert']);
        Route::get('/auspicious-days',          [CalendarController::class, 'auspiciousDays']);
    });

    // Holidays
    Route::get('/holidays',         [HolidayController::class, 'index']);
    Route::get('/holidays/{id}',    [HolidayController::class, 'show']);
    Route::post('/holidays',        [HolidayController::class, 'store']); // admin only

    // Personal Events (CRUD)
    Route::apiResource('events', EventController::class);

    // User settings & device token
    Route::prefix('user')->group(function () {
        Route::get('/settings',       [UserController::class, 'settings']);
        Route::patch('/settings',     [UserController::class, 'updateSettings']);
        Route::post('/device-token',  [UserController::class, 'upsertDeviceToken']);
    });
});
