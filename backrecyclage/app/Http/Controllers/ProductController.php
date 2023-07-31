<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::select('title', 'description', 'image')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            'image'=>'required|image'
        ]);

        $imageName = Str::random().'.'.$request->image->getClientOrginalExtension();
        Storage::disk('public')->putFileAs('product/image', $request->image, $imageName);
        Product::create($request->post()+['image'=> $request->image]);
        return response()->json([
            'message'=>'Item added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json([
            'product'=> $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            'image'=>'nullable'
        ]);
//nullable ya3ni hata ken badelch l'urilisateur aswira ntalalouch erreur
        $product->fill($request->post())->update();


//bech ybadel taswira etha taswira mwjouda tetfasa5
       if ($request->hasFile(image)) {
        if ($product->image) {
            $exist =  Storage::disk('public')->exists("product/image {$product->image}");
            if ($exist) {
                Storage::disk('public')->delete("product/image {$product->image}");
            }
        }



        $imageName = Str::random().'.'.$request->image->getClientOrginalExtension();
        Storage::disk('public')->putFileAs('product/image', $request->image, $imageName);
        $product->image = $imageName;
        $product->save();

       }

        return response()->json([
            'message'=>'Item updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($request->image) {
            $exist =  Storage::disk('public')->exists("product/image {$request->image}");
            if ($exist) {
                Storage::disk('public')->delete("product/image {$request->image}");
            }
        }
        $product->delete();
        return response()->json([
            'message'=>'Item deleted successfully'
        ]);
    }
}
