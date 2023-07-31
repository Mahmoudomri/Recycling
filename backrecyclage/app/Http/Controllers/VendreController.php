<?php

namespace App\Http\Controllers;

use App\Models\Vendre;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VendreController extends Controller
{
    public function index()
    {
        $vendres = vendre::all();
        return response()->json($vendres);
    }


    public function show($id)
    {
        $vendre = vendre::find($id);
        if(!$vendre) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        return response()->json($vendre);
    }



    public function store(Request $request)
    {
        $vendre = vendre::create($request->all());
        return response()->json($vendre, 201);
    }

    public function destroy($idobjet)
    {
        $vendre = vendre::where('idobjet', $idobjet)->first();
        if(!$vendre) {
            return response()->json(['error' => 'Record not found'], 404);
        }
        $vendre->delete();
        return response()->json(['message' => 'Record deleted']);
    }

}
