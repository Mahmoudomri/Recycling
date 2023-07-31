<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\Categorie;

class CategorieController extends Controller
{

public function index()
{
$categories = Categorie::all();
return response()->json($categories);
}

public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|max:255',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $categorie = new Categorie();
    $categorie->title = $request->input('title');

    $image = $request->file('image');
    $imageName = Str::slug($request->input('title')).'-'.Carbon::now()->timestamp.'.'.$image->getClientOriginalExtension();
    Storage::disk('public')->put($imageName, file_get_contents($image));
    $categorie->image = $imageName;

    $categorie->save();

    //return redirect()->route('categories.index')->with('success', 'Category created successfully');
    return response()->json($categorie, 201);
}

public function show(Categorie $categorie)
{
   // return view('categories.show', compact('categorie'));
   $categorie = Categorie::find($id);
        if(!$categorie) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        return response()->json($categorie);
}
public function update(Request $request, $id)
{
    $categorie = Categorie::findOrFail($id);
    $categorie->title = $request->input('title');

    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $filename = 'categorie_' . $id . '_' . time() . '.' . $image->getClientOriginalExtension();
        $image->storeAs('public/categories', $filename);
        $categorie->image = $filename;
    }

    $categorie->save();

    return response()->json(['message' => 'Catégorie mise à jour avec succès']);
}




public function destroy($id)
{
    $categorie = Categorie::findOrFail($id);
    Storage::disk('public')->delete($categorie->image);
    $categorie->delete();
    return response()->json(['message' => 'Category deleted']);
}

}
