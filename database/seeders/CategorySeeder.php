<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
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
                'name' => 'Fleta',
                'alias' => 'Assumenda tenetur laudantium totam libero quis dicta.',
                'ordering' => 0,
                'image' => 'https://loremflickr.com/640/480/fashion',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Laila',
                'alias' => 'Exercitationem nam debitis voluptate quod dicta deserunt veniam.',
                'ordering' => 1,
                'image' => 'https://loremflickr.com/640/480/fashion',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Mariela',
                'alias' => 'Natus commodi reiciendis labore.',
                'ordering' => 2,
                'image' => 'https://loremflickr.com/640/480/fashion',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Erika',
                'alias' => 'Soluta commodi ipsam dolore adipisci voluptates ex quos natus placeat.',
                'ordering' => 3,
                'image' => 'https://loremflickr.com/640/480/fashion',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Yasmin',
                'alias' => 'Ad animi officiis labore nihil tempore ratione nam nihil.',
                'ordering' => 4,
                'image' => 'https://loremflickr.com/640/480/fashion',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Shirley',
                'alias' => 'Voluptate nobis quam quo ipsam.',
                'ordering' => 5,
                'image' => 'https://loremflickr.com/640/480/fashion',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Rodrigo',
                'alias' => 'Similique dolore natus praesentium iste sed beatae.',
                'ordering' => 6,
                'image' => 'https://loremflickr.com/640/480/fashion',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Verona',
                'alias' => 'Ipsa facilis in eos est.',
                'ordering' => 7,
                'image' => 'https://loremflickr.com/640/480/fashion',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Jarvis',
                'alias' => 'Maiores quisquam commodi.',
                'ordering' => 8,
                'image' => 'https://loremflickr.com/640/480/fashion',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'name' => 'Jacey',
                'alias' => 'Recusandae et suscipit consectetur consequatur repellat.',
                'ordering' => 9,
                'image' => 'https://loremflickr.com/640/480/fashion',
                'is_active' => '0',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ]
        ];
        Category::insert($data);
    }
}
