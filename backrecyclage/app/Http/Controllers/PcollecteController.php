<?php

namespace App\Http\Controllers;

use App\Models\Pcollecte;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PcollecteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pcollectes = pcollecte::all();
        return response()->json($pcollectes);
    }



    public function uploadImage(Request $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = $image->store('images');

            $pcollecte = new pcollecte();
            $pcollecte->image = $filename;
            $pcollecte->save();

            return response()->json([
                'filename' => $filename
            ]);
        }

        return response()->json([
            'error' => 'No image found'
        ]);
    }


    public function show($id)
    {
        $pcollecte = pcollecte::find($id);
        if(!$pcollecte) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        return response()->json($pcollecte);
    }



    public function store(Request $request)
    {
        $pcollecte = pcollecte::create($request->all());
        return response()->json($pcollecte, 201);
    }

    public function update(Request $request, $id)
    {
        $pcollecte = pcollecte::find($id);
        if(!$pcollecte) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        $pcollecte->update($request->all());
        return response()->json($pcollecte);
    }

    public function destroy($id)
    {
        $pcollecte = pcollecte::find($id);
        if(!$pcollecte) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        $pcollecte->delete();
        return response()->json(['message' => 'Category deleted']);
    }
}
