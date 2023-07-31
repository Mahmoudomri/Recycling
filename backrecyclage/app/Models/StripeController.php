<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StripeController extends Model
{
    use HasFactory;
    protected $fillable = [
        'stripe_id',
        'card_brand',
        'card_last_four',
        'amount',
        'currency',
        'description',
        'user_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
