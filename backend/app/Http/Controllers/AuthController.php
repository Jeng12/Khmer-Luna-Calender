<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

/**
 * AuthController
 *
 * Sanctum token-based authentication.
 * POST /api/auth/register  → creates user, returns token
 * POST /api/auth/login     → validates credentials, returns token
 * POST /api/auth/logout    → revokes current token
 */
class AuthController extends Controller
{
    // POST /api/auth/register
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'language' => 'nullable|in:km,en',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'language' => $request->language ?? 'km',
        ]);

        $token = $user->createToken('mobile')->plainTextToken;

        return response()->json([
            'success' => true,
            'data'    => [
                'user'  => $user->only('id', 'name', 'email', 'language'),
                'token' => $token,
            ],
        ], 201);
    }

    // POST /api/auth/login
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        $user  = Auth::user();
        $token = $user->createToken('mobile')->plainTextToken;

        return response()->json([
            'success' => true,
            'data'    => [
                'user'  => $user->only('id', 'name', 'email', 'language', 'preferred_view'),
                'token' => $token,
            ],
        ]);
    }

    // POST /api/auth/logout
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out',
        ]);
    }
}
