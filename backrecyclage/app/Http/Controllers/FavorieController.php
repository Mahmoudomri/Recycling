<?php

namespace App\Http\Controllers;

use App\Models\Favorie;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FavorieController extends Controller
{
    public function index()
    {
        $favories = favorie::all();
        return response()->json($favories);
    }


    public function show($id)
    {
        $favorie = favorie::find($id);
        if(!$favorie) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        return response()->json($favorie);
    }



    public function store(Request $request)
    {
        $favorie = favorie::create($request->all());
        return response()->json($favorie, 201);
    }

    public function delete($id)
    {
        $favorie = favorie::find($id);
        if(!$favorie) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        $favorie->delete();
        return response()->json(['message' => 'Category deleted']);
    }

    public function destroy(Request $request)
    {
        $favorie = favorie::where('email', $request->email)
                          ->where('quantite', $request->quantite)
                          ->where('qualite', $request->qualite)
                          ->first();

        if(!$favorie) {
            return response()->json(['error' => 'Favorite not found'], 404);
        }

        $favorie->delete();

        return response()->json(['message' => 'Favorite deleted']);
    }
}


