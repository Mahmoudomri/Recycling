<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Signup;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens; // Import the HasApiTokens trait
use Illuminate\Foundation\Auth\User as Authenticatable;


class SignupController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = Signup::where('email', $credentials['email'])->first();

        if ($user && Hash::check($credentials['password'], $user->password)) {
            if ($user->email === 'admin@gmail.com' && $credentials['password'] === 'adminadmin') {
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json(['access_token' => $token], 200);
            }

            return response()->json(['message' => 'Logged in successfully'], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'tel' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'daten' => 'required|string|max:255',
            'email' => 'required|string|email|unique:signups|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()], 400);
        }

        $signup = new Signup([
            'name' => $request->name,
            'prenom' => $request->prenom,
            'type' => $request->type,
            'tel' => $request->tel,
            'adresse' => $request->adresse,
            'daten' => $request->daten,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $signup->save();

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function get()
    {
        $signups = Signup::all();

        return response()->json($signups, 200);
    }




    public function update(Request $request, $email)
    {
        $signup = Signup::where('email', $email)->first();

        if (!$signup) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'tel' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'daten' => 'required|string|max:255',
            'email' => 'required',
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $signup->name = $request->name;
        $signup->prenom = $request->prenom;
        $signup->type = $request->type;
        $signup->tel = $request->tel;
        $signup->adresse = $request->adresse;
        $signup->daten = $request->daten;
        $signup->email = $request->email;
        if (!empty($request->password)) {
            $signup->password = bcrypt($request->password);
        }

        $signup->save();

        return response()->json(['message' => 'User updated successfully'], 200);
    }



    public function index()
    {
        $signups = signup::all();
        return response()->json($signups);
    }

    public function show($email)
    {
        $signup = signup::where('email', $email)->first();
        if(!$signup) {
            return response()->json(['error' => 'Signup not found'], 404);
        }
        return response()->json($signup);
    }

}
