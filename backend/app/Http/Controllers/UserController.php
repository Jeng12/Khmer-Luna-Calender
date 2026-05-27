<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\DeviceToken;

class UserController extends Controller
{
    // GET /api/user/settings
    public function settings(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json([
            'success' => true,
            'data'    => $user->only('id', 'name', 'email', 'language', 'preferred_view'),
        ]);
    }

    // PATCH /api/user/settings
    public function updateSettings(Request $request): JsonResponse
    {
        $request->validate([
            'language'       => 'nullable|in:km,en',
            'preferred_view' => 'nullable|in:lunar,gregorian,both',
        ]);

        $request->user()->update($request->only('language', 'preferred_view'));

        return response()->json([
            'success' => true,
            'data'    => $request->user()->fresh()->only('id', 'language', 'preferred_view'),
        ]);
    }

    // POST /api/user/device-token
    public function upsertDeviceToken(Request $request): JsonResponse
    {
        $request->validate([
            'token'    => 'required|string',
            'platform' => 'required|in:ios,android',
        ]);

        // Upsert: one token per user per platform
        DeviceToken::updateOrCreate(
            ['user_id' => $request->user()->id, 'platform' => $request->platform],
            ['token'   => $request->token]
        );

        return response()->json(['success' => true, 'message' => 'Token registered']);
    }
}
