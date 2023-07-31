<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function stripePost(Request $request)
    {
        try {
            $stripe = new StripeClient(env('STRIPE_SECRET'));

            $res = $stripe->tokens->create([
                'card' => [
                    'number' => $request->input('number'),
                    'exp_month' => $request->input('exp_month'),
                    'exp_year' => $request->input('exp_year'),
                    'cvc' => $request->input('cvc'),
                ],
            ]);

            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

            $response = $stripe->charges->create([
                'amount' => intval($request->input('amount')),
                'currency' => 'usd',
                'source' => $res->id,
                'description' => $request->input('description'),
            ]);

            return response()->json([$response->status], 201);
        } catch (Exception $ex) {
            return response()->json(['response' => 'Error'], 500);
        }
    }
}
