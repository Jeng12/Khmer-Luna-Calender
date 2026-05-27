<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('personal_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('gregorian_date');
            // Snapshot of Khmer date at creation time (immutable lunar mapping)
            $table->json('khmer_date')->nullable();
            // e.g. { "lunar_day": 10, "lunar_month": "ពិសាខ", "moon_phase": "🌔", "be": 2570 }
            $table->string('moon_phase', 4)->nullable();   // emoji stored directly
            $table->string('color', 7)->default('#C8973A'); // hex
            $table->timestamps();

            $table->index(['user_id', 'gregorian_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('personal_events');
    }
};
