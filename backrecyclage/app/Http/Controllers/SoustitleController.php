<?php

namespace App\Http\Controllers;

use App\Models\Soustitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;

class SoustitleController extends Controller
{

public function index()
{
$soustitles = Soustitle::all();
return response()->json($soustitles);
}

public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|max:255',
        'titledeux' => 'required|max:255',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $soustitle = new Soustitle();
    $soustitle->title = $request->input('title');
    $soustitle->titledeux = $request->input('titledeux');

    $image = $request->file('image');
    $imageName = Str::slug($request->input('title')).'-'.Carbon::now()->timestamp.'.'.$image->getClientOriginalExtension();
    Storage::disk('public')->put($imageName, file_get_contents($image));
    $soustitle->image = $imageName;

    $soustitle->save();

    //return redirect()->route('categories.index')->with('success', 'Category created successfully');
    return response()->json($soustitle, 201);
}

public function show(Soustitle $soustitle)
{
   // return view('categories.show', compact('categorie'));
   $soustitle = Soustitle::find($id);
        if(!$soustitle) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        return response()->json($soustitle);
}

public function update(Request $request, $id)
{
    $soustitle = Soustitle::findOrFail($id);
    $soustitle->title = $request->input('title');
    $soustitle->titledeux = $request->input('titledeux');

    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $filename = 'soustitle.jpg';
        $image->storeAs('public', $filename);
        $soustitle->image = $filename;
    }

    $soustitle->save();

    return response()->json(['message' => 'Category updated successfully']);
}


public function destroy($id)
{
    $soustitle = Soustitle::findOrFail($id);
    Storage::disk('public')->delete($soustitle->image);
    $soustitle->delete();
    return response()->json(['message' => 'Category deleted']);
}

}
