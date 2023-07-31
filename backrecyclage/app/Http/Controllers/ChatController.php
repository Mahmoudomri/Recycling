<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index(Request $request)
    {
    $recipient_email = $request->input('recipient_email');
    $produit = $request->input('produit');
    $messages = Chat::where('recipient_email', $recipient_email)->orderBy('created_at', 'asc')->get();

    return $messages;
}

public function store(Request $request)
{
    $message = Chat::create([
        'body' => $request->input('body'),
        'sender_email' => $request->input('sender_email'),
        'recipient_email' => $request->input('recipient_email'),
        'produit' => $request->input('produit'),
    ]);
    $message->refresh();
    return $message;
    //$message->refresh();
}
}
