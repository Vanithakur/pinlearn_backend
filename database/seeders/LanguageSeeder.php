<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'name' => 'EN',
                'key' => 'en',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'ZH',
                'key' => 'zh',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'HI',
                'key' => 'hi',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'AR',
                'key' => 'ar',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'CA',
                'key' => 'ca',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'MS',
                'key' => 'ms',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],

            [
                'name' => 'ES',
                'key' => 'es',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'SK',
                'key' => 'sk',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'PL',
                'key' => 'pl',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'FR',
                'key' => 'fr',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ]
        ];
        Language::insert($data);
    }
}
