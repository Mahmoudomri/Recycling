<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class objet extends Model
{
    use HasFactory;
    protected $fillable = ['title','type','adresse','email','prix','quantite','qualite', 'image','description'];
}
