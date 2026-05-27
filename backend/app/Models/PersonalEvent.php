<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'gregorian_date',
        'khmer_date',      // JSON: { lunar_day, lunar_month, moon_phase, buddhist_era }
        'moon_phase',
        'color',
    ];

    protected $casts = [
        'gregorian_date' => 'date',
        'khmer_date'     => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
