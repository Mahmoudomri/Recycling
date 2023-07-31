<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\Profil;


class ProfilController extends Controller
{

public function index()
{
$profils = Profil::all();
return response()->json($profils);
}

public function store(Request $request)
{
    $validatedData = $request->validate([
        'nom' => 'required|max:255',
        'email' => 'required|max:255',
        'tel' => 'required|max:255',
        'adresse' => 'required|max:255',
        'daten' => 'required|max:255',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $profil = new Profil();
    $profil->nom = $request->input('nom');
    $profil->email = $request->input('email');
    $profil->tel = $request->input('tel');
    $profil->adresse = $request->input('adresse');
    $profil->daten = $request->input('daten');



    $image = $request->file('image');
    $imageName = Str::slug($request->input('nom')).'-'.Carbon::now()->timestamp.'.'.$image->getClientOriginalExtension();
    Storage::disk('public')->put($imageName, file_get_contents($image));
    $profil->image = $imageName;

    $profil->save();

    //return redirect()->route('categories.index')->with('success', 'Category created successfully');
    return response()->json($profil, 201);
}

public function show(Profil $profil)
{
   // return view('categories.show', compact('categorie'));
   $profil = Profil::find($id);
        if(!$profil) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        return response()->json($profil);
}

public function update(Request $request, $id)
{
    $profil = Profil::findOrFail($id);
    $profil->nom = $request->input('nom');
    $profil->email = $request->input('email');
    $profil->tel = $request->input('tel');
    $profil->adresse = $request->input('adresse');
    $profil->daten = $request->input('daten');


    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $filename = 'profil.jpg';
        $image->storeAs('public', $filename);
        $profil->image = $filename;
    }

    $profil->save();

    return response()->json(['message' => 'Category updated successfully']);
}


public function destroy($id)
{
    $profil = Profil::findOrFail($id);
    Storage::disk('public')->delete($profil->image);
    $profil->delete();
    return response()->json(['message' => 'Category deleted']);
}

}
