<?php

namespace App\Http\Controllers;

use App\Models\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /**
     * Authenticate user and return access token
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Get user credentials from request
        $credentials = $request->only('email', 'password');

        // Attempt to authenticate user
        if (Auth::attempt($credentials)) {
            // Generate access token for authenticated user
            $user = $request->user();
            $token = $user->createToken('auth_token')->accessToken;

            // Return access token
            return response()->json(['access_token' => $token], 200);
        }

        // Return error message for invalid credentials
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
