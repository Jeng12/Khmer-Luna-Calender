<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_km',
        'name_en',
        'description_km',
        'description_en',
        'gregorian_date',
        'lunar_month',
        'lunar_day',
        'type',             // 'national' | 'buddhist' | 'royal'
        'is_public',
    ];

    protected $casts = [
        'gregorian_date' => 'date',
        'is_public'      => 'boolean',
    ];
}
