<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ProfilController;

use App\Http\Controllers\PcollecteController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ObjetController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PhotocategorieController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\HistoriqueController;
use App\Http\Controllers\FavorieController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\VendreController;
use App\Http\Controllers\SoustitleController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use Geocoder\Query\GeocodeQuery;
use Geocoder\Provider\GoogleMaps\GoogleMaps;
use Geocoder\StatefulGeocoder;
//use App\Http\Controllers\ChatController;
/*
Route::get('/messages', function () {
    $messages = \App\Models\Message::with('user')->get();
    return $messages;
});

Route::post('/messages', function (Illuminate\Http\Request $request) {
    $message = new \App\Models\Message;
    $message->body = $request->input('text');
    $message->user_id = 1; // Replace with the authenticated user's ID
    $message->save();
    $message->load('user');
    return $message;
});
*/


Route::get('/chats', [ChatController::class, 'index']);
Route::post('/chats', [ChatController::class, 'store']);



Route::get('/vendres', function () {
    $geocoder = new StatefulGeocoder(new GoogleMaps());

    $vendres = Vendre::all();

    $vendresWithCoords = $vendres->map(function ($vendre) use ($geocoder) {
        $address = $vendre->adresseun . ' ' . $vendre->adressedeux . ' ' . $vendre->ville . ' ' . $vendre->pays;
        $result = $geocoder->geocodeQuery(GeocodeQuery::create($address))->first();

        if ($result) {
            $vendre->latitude = $result->getCoordinates()->getLatitude();
            $vendre->longitude = $result->getCoordinates()->getLongitude();
        }

        return $vendre;
    });

    return response()->json($vendresWithCoords);
});

/*
Route::post('login', [LoginController::class, 'login']);
Route::post('login', 'App\Http\Controllers\LoginController@login');
*/
//Route::middleware('auth:api')->group(function () {
 //   Route::get('/chat/history', 'ChatController@getChatHistory');
   // Route::post('/chat/send', 'ChatController@sendMessage');
//});
Route::get('/messages', [MessageController::class, 'index']);
Route::post('/messages', [MessageController::class, 'store']);


Route::get('/chat/history', [ChatController::class, 'getChatHistory']);
Route::post('/chat/send', [ChatController::class, 'sendMessage']);

Route::post('stripe', [StripeController::class, 'stripePost']);



Route::get('/signup', [SignupController::class, 'index']);
Route::get('/signup/{email}', [SignupController::class, 'show']);
Route::post('register', [SignupController::class, 'register']);


Route::put('/api/signup/{email}', [SignupController::class, 'update']);
Route::get('/signup', [SignupController::class, 'get']);


//Route::put('/signup/{email}', [SignupController::class, 'update']);
Route::post('/login', [SignupController::class, 'login']);

Route::resource('photocategories', PhotocategorieController::class);
Route::resource('products', ProductController::class);
Route::resource('categories', CategorieController::class);
//Route::resource('categories', CategorieController::class);

Route::get('/photocategories', [PhotocategorieController::class, 'index']);
Route::get('/photocategories/{id}', [PhotocategorieController::class, 'show']);
Route::post('/photocategories', [PhotocategorieController::class, 'store']);
Route::put('/photocategories/{id}', [PhotocategorieController::class, 'update']);
Route::delete('/photocategories/{id}', [PhotocategorieController::class, 'destroy']);


Route::get('/objets', [ObjetController::class, 'index']);
Route::get('/objets/{id}', [ObjetController::class, 'show']);
Route::post('/objets', [ObjetController::class, 'store']);
Route::put('/objets/{id}', [ObjetController::class, 'update']);
Route::delete('/objets/{id}', [ObjetController::class, 'destroy']);

Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/categories/{id}', [CategorieController::class, 'show']);
Route::post('/categories', [CategorieController::class, 'store']);
Route::put('/categories/{id}', [CategorieController::class, 'update']);
Route::delete('/categories/{id}', [CategorieController::class, 'destroy']);




Route::get('/soustitles', [SoustitleController::class, 'index']);
Route::get('/soustitles/{id}', [SoustitleController::class, 'show']);
Route::post('/soustitles', [SoustitleController::class, 'store']);
Route::put('/soustitles/{id}', [SoustitleController::class, 'update']);
Route::delete('/soustitles/{id}', [SoustitleController::class, 'destroy']);



Route::get('/profils', [ProfilController::class, 'index']);
Route::get('/profils/{id}', [ProfilController::class, 'show']);
Route::post('/profils', [ProfilController::class, 'store']);
Route::put('/profils/{id}', [ProfilController::class, 'update']);
Route::delete('/profils/{id}', [ProfilController::class, 'destroy']);


Route::get('/pcollectes', [PcollecteController::class, 'index']);
Route::get('/pcollectes/{id}', [PcollecteController::class, 'show']);
Route::post('/pcollectes', [PcollecteController::class, 'store']);
Route::put('/pcollectes/{id}', [PcollecteController::class, 'update']);
Route::delete('/pcollectes/{id}', [PcollecteController::class, 'destroy']);


Route::get('/historiques', [HistoriqueController::class, 'index']);
Route::get('/historiques/{id}', [HistoriqueController::class, 'show']);
Route::post('/historiques', [HistoriqueController::class, 'store']);
Route::delete('/historiques/{id}', [HistoriqueController::class, 'destroy']);
Route::delete('/historiques/{idobjet}', [HistoriqueController::class, 'destroyed']);

Route::get('/vendres', [VendreController::class, 'index']);
Route::get('/vendres/{id}', [VendreController::class, 'show']);
Route::post('/vendres', [VendreController::class, 'store']);
Route::delete('/vendres/{idobjet}', [VendreController::class, 'destroy']);



Route::delete('/favories/{id}', [FavorieController::class, 'delete']);
Route::get('/favories', [FavorieController::class, 'index']);
Route::get('/favories/{id}', [FavorieController::class, 'show']);
Route::post('/favories', [FavorieController::class, 'store']);
Route::delete('/favories/', [FavorieController::class, 'destroy']);


Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
