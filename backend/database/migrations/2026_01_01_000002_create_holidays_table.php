<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('holidays', function (Blueprint $table) {
            $table->id();
            $table->string('name_km');
            $table->string('name_en');
            $table->text('description_km')->nullable();
            $table->text('description_en')->nullable();
            $table->date('gregorian_date');
            $table->unsignedTinyInteger('lunar_month')->nullable();   // 1–13 (13 = leap Ashad)
            $table->unsignedTinyInteger('lunar_day')->nullable();     // 1–30
            $table->enum('type', ['national', 'buddhist', 'royal'])->default('national');
            $table->boolean('is_public')->default(true);
            $table->timestamps();

            $table->index('gregorian_date');
            $table->index(['type', 'is_public']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('holidays');
    }
};
