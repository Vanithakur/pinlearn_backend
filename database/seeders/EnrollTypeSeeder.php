<?php

namespace Database\Seeders;

use App\Models\EnrollType;
use Illuminate\Database\Seeder;

class EnrollTypeSeeder extends Seeder
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
                'name' => 'group',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'course',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ]
        ];

        EnrollType::insert($data);
    }
}
