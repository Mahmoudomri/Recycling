<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vendres', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('idobjet');
            $table->string('email');
            $table->string('prenom');
            $table->string('adresseun');
            $table->string('adressedeux');
            $table->string('pays');
            $table->string('ville');
            $table->string('codepostal');
            $table->string('telephone');
            $table->string('informations');
            $table->string('modepaiement');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendres');
    }
};
