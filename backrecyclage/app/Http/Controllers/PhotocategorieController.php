<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photocategorie;

class PhotocategorieController extends Controller
{
    private $photo;

    public function __construct(Photocategorie $photo)
    {
        $this->photo = $photo;
    }

    public function index()
    {
        $photos = Photocategorie::all();

        return response()->json($photos);
    }

    public function show($id)
    {
        $photo = $this->photo->findOrFail($id);

        return response()->json($photo);
    }

    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $photo = $this->photo->create([
            'photo' => $request->file('photo')->get(),
            'type' => $request->file('photo')->getClientOriginalExtension(), // Stocker le type d'image sous forme de chaîne de caractères
        ]);

        return response()->json(['message' => 'Photo uploaded successfully']);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $photo = $this->photo->findOrFail($id);

        $photo->update([
            'photo' => $request->file('photo')->get(),
            'type' => $request->file('photo')->getClientOriginalExtension(), // Stocker le type d'image sous forme de chaîne de caractères
        ]);

        return response()->json(['message' => 'Photo updated successfully']);
    }

    public function destroy($id)
    {
        $photo = $this->photo->findOrFail($id);

        $photo->delete();

        return response()->json(['message' => 'Photo deleted successfully']);
    }
}
