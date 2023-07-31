<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
class Signup extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    use HasFactory;
    protected $fillable = [
        'name',
        'prenom',
        'type',
        'tel',
        'adresse',
        'daten',
        'email',
        'password',
    ];
}
