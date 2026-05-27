<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Holiday;

/**
 * HolidaySeeder
 *
 * Seeds the 28 official Cambodian public holidays for 2026.
 * Gregorian dates are provided; lunar date fields will be
 * populated by KhmerCalendarService::toKhmer() once wired up.
 *
 * Claude prompt to generate full lunar mapping:
 *   "Using asorasoft/chhankitek, loop through these holidays and
 *    fill lunar_month, lunar_day, moon_phase for each."
 */
class HolidaySeeder extends Seeder
{
    public function run(): void
    {
        $holidays = [
            // National
            ['name_km' => 'ថ្ងៃចូលឆ្នាំសកល',          'name_en' => "New Year's Day",          'gregorian_date' => '2026-01-01', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្មព្រះករុណា', 'name_en' => "Victory Day over Genocide", 'gregorian_date' => '2026-01-07', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃអន្តរជាតិនារី',          'name_en' => "International Women's Day",'gregorian_date' => '2026-03-08', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃចូលឆ្នាំថ្មីខ្មែរ',      'name_en' => 'Khmer New Year (Day 1)',   'gregorian_date' => '2026-04-14', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃចូលឆ្នាំថ្មីខ្មែរ',      'name_en' => 'Khmer New Year (Day 2)',   'gregorian_date' => '2026-04-15', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃចូលឆ្នាំថ្មីខ្មែរ',      'name_en' => 'Khmer New Year (Day 3)',   'gregorian_date' => '2026-04-16', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃទិវាពលកម្ម',             'name_en' => 'International Labor Day',  'gregorian_date' => '2026-05-01', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ព្រះរាជពិធីបុណ្យព្រះជន្ម',  'name_en' => "King's Birthday",          'gregorian_date' => '2026-05-14', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃជាតិ',                   'name_en' => 'National Day',             'gregorian_date' => '2026-11-09', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ព្រះរាជពិធីបុណ្យជួបជុំគ្រួសារ', 'name_en' => "Queen Mother's Birthday", 'gregorian_date' => '2026-06-18', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃរំឭករដ្ឋធម្មនុញ្ញ',    'name_en' => 'Constitution Day',         'gregorian_date' => '2026-09-24', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃបុណ្យអុំទូក',            'name_en' => 'Water Festival (Day 1)',   'gregorian_date' => '2026-11-02', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃបុណ្យអុំទូក',            'name_en' => 'Water Festival (Day 2)',   'gregorian_date' => '2026-11-03', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃបុណ្យអុំទូក',            'name_en' => 'Water Festival (Day 3)',   'gregorian_date' => '2026-11-04', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃឯករាជ្យ',               'name_en' => 'Independence Day',         'gregorian_date' => '2026-11-09', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ព្រះរាជពិធីបុណ្យព្រះជន្ម',  'name_en' => "King Father's Birthday",  'gregorian_date' => '2026-10-31', 'type' => 'national', 'is_public' => true],
            ['name_km' => 'ថ្ងៃបុណ្យឃ្លោម',             'name_en' => 'Paris Peace Agreement Day','gregorian_date' => '2026-10-23', 'type' => 'national', 'is_public' => true],

            // Buddhist
            ['name_km' => 'ថ្ងៃមាឃបូជា',              'name_en' => 'Meak Bochea',             'gregorian_date' => '2026-02-11', 'type' => 'buddhist', 'is_public' => true],
            ['name_km' => 'ថ្ងៃវិសាខបូជា',             'name_en' => 'Visak Bochea',            'gregorian_date' => '2026-05-13', 'type' => 'buddhist', 'is_public' => true],
            ['name_km' => 'ថ្ងៃភ្ជុំបិណ្ឌ',             'name_en' => 'Pchum Ben (Day 1)',       'gregorian_date' => '2026-09-14', 'type' => 'buddhist', 'is_public' => true],
            ['name_km' => 'ថ្ងៃភ្ជុំបិណ្ឌ',             'name_en' => 'Pchum Ben (Day 2)',       'gregorian_date' => '2026-09-15', 'type' => 'buddhist', 'is_public' => true],
            ['name_km' => 'ថ្ងៃភ្ជុំបិណ្ឌ',             'name_en' => 'Pchum Ben (Day 3)',       'gregorian_date' => '2026-09-16', 'type' => 'buddhist', 'is_public' => true],
            ['name_km' => 'ថ្ងៃចូលវស្សា',              'name_en' => 'Buddhist Lent',           'gregorian_date' => '2026-07-13', 'type' => 'buddhist', 'is_public' => false],
            ['name_km' => 'ថ្ងៃចេញវស្សា',             'name_en' => 'End of Buddhist Lent',    'gregorian_date' => '2026-10-11', 'type' => 'buddhist', 'is_public' => false],
        ];

        foreach ($holidays as $h) {
            Holiday::firstOrCreate(
                ['gregorian_date' => $h['gregorian_date'], 'name_en' => $h['name_en']],
                $h
            );
        }
    }
}
