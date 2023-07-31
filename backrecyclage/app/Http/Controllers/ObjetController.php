<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\objet;
use Illuminate\Http\Request;

class ObjetController extends Controller
{

public function index()
{
$objets = Objet::all();
return response()->json($objets);
}

public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|max:255',
        'type' => 'required|max:255',
        'adresse' => 'required',
        'email' => 'required|max:255',
        'prix' => 'required|max:255',
        'quantite' => 'required|max:255',
        'qualite' => 'required|max:255',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'description' => 'required|max:255',
    ]);

    $objet = new Objet();
    $objet->title = $request->input('title');
    $objet->type = $request->input('type');
    $objet->adresse = $request->input('adresse');
    $objet->email = $request->input('email');
    $objet->prix = $request->input('prix');
    $objet->quantite = $request->input('quantite');
    $objet->qualite = $request->input('qualite');
    $objet->description = $request->input('description');
    $image = $request->file('image');
    $imageName = Str::slug($request->input('title')).'-'.Carbon::now()->timestamp.'.'.$image->getClientOriginalExtension();
    Storage::disk('public')->put($imageName, file_get_contents($image));
    $objet->image = $imageName;

    $objet->save();

    //return redirect()->route('categories.index')->with('success', 'Category created successfully');
    return response()->json($objet, 201);
}

public function show(Objet $objet)
{
   // return view('categories.show', compact('categorie'));
   $objet = Objet::find($id);
        if(!$objet) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        return response()->json($objet);
}

public function update(Request $request, $id)
{
    $objet = Objet::findOrFail($id);
    $objet->title = $request->input('title');
    $objet->type = $request->input('type');
    $objet->adresse = $request->input('adresse');
    $objet->email = $request->input('email');
    $objet->prix = $request->input('prix');
    $objet->quantite = $request->input('quantite');
    $objet->qualite = $request->input('qualite');
    $objet->description = $request->input('description');
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $filename = 'objet.jpg';
        $image->storeAs('public', $filename);
        $objet->image = $filename;
    }

    $objet->save();

    return response()->json(['message' => 'Category updated successfully']);
}


public function destroy($id)
{
    $objet = Objet::findOrFail($id);
    Storage::disk('public')->delete($objet->image);
    $objet->delete();
    return response()->json(['message' => 'Category deleted']);
}
}
