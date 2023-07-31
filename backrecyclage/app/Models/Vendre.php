<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendre extends Model
{
    use HasFactory;
    protected $fillable = ['nom','idobjet','email', 'prenom','adresseun','adressedeux','pays','ville','codepostal','telephone','informations','modepaiement'];
}
