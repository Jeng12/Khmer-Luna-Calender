<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'language',         // 'km' | 'en'
        'preferred_view',   // 'lunar' | 'gregorian' | 'both'
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
    ];

    // ── Relations ──────────────────────────────────────────────────────────

    public function personalEvents()
    {
        return $this->hasMany(PersonalEvent::class);
    }

    public function deviceTokens()
    {
        return $this->hasMany(DeviceToken::class);
    }
}
