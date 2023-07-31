<?php

namespace App\Http\Controllers;

use App\Models\Historique;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HistoriqueController extends Controller
{
    public function index()
    {
        $historiques = historique::all();
        return response()->json($historiques);
    }


    public function show($id)
    {
        $historique = historique::find($id);
        if(!$historique) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        return response()->json($historique);
    }



    public function store(Request $request)
    {
        $historique = historique::create($request->all());
        return response()->json($historique, 201);
    }

    public function destroy($id)
    {
        $historique = historique::find($id);
        if(!$historique) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        $historique->delete();
        return response()->json(['message' => 'Category deleted']);
    }


    public function destroyed($idobjet)
    {
        $historique = historique::where('idobjet', $idobjet)->first();
        if(!$historique) {
            return response()->json(['error' => 'Record not found'], 404);
        }
        $historique->delete();
        return response()->json(['message' => 'Record deleted']);
    }
}
