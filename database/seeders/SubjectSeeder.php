<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
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
                'name' => 'Caterina',
                'alias' => 'Dolor qui quo magnam ipsa incidunt iure ex.',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Brionna',
                'alias' => 'Deserunt quae reiciendis modi inventore nam iusto labore autem.',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Thelma',
                'alias' => 'Esse quae quos corrupti.',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Kara',
                'alias' => 'Vel a fugiat in itaque quia quis sit numquam.',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Bridie',
                'alias' => 'Nostrum nobis cumque nihil.',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Theron',
                'alias' => 'Excepturi quaerat impedit porro natus dicta nostrum.',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Caterina',
                'alias' => 'Dolor qui quo magnam ipsa incidunt iure ex.',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Caterina',
                'alias' => 'Dolor qui quo magnam ipsa incidunt iure ex.',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Caterina',
                'alias' => 'Dolor qui quo magnam ipsa incidunt iure ex.',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],

            [
                'name' => 'Caterina',
                'alias' => 'Dolor qui quo magnam ipsa incidunt iure ex.',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ]

        ];
        Subject::insert($data);
    }
}
