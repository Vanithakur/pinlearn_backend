<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
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
                'code' => 'rRpx4p5',
                'name' => 'Kelli',
                'discount_type' => 'percentage',
                'discount_value' => 668,
                'enroll_type_id' => 1,
                'limit' => 2,
                'start_date' => '2022-11-10 13:35:30',
                'expired_date' => '2022-11-10 13:35:30',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'code' => 'VzSyvrA',
                'name' => 'Abdiel',
                'discount_type' => 'percentage',
                'discount_value' => 828,
                'enroll_type_id' => 1,
                'limit' => 2,
                'start_date' => '2022-11-10 13:35:30',
                'expired_date' => '2022-11-10 13:35:30',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'code' => '0wJa5pK',
                'name' => 'Janice',
                'discount_type' => 'percentage',
                'discount_value' => 890,
                'enroll_type_id' => 1,
                'limit' => 2,
                'start_date' => '2022-11-10 13:35:30',
                'expired_date' => '2022-11-10 13:35:30',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'code' => 'vhG7hOl',
                'name' => 'Callie',
                'discount_type' => 'percentage',
                'discount_value' => 605,
                'enroll_type_id' => 1,
                'limit' => 2,
                'start_date' => '2022-11-10 13:35:30',
                'expired_date' => '2022-11-10 13:35:30',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'code' => 'aX7bHgi',
                'name' => 'Douglas',
                'discount_type' => 'percentage',
                'discount_value' => 679,
                'enroll_type_id' => 1,
                'limit' => 2,
                'start_date' => '2022-11-10 13:35:30',
                'expired_date' => '2022-11-10 13:35:30',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'code' => '4lpn6UK',
                'name' => 'Hosea',
                'discount_type' => 'percentage',
                'discount_value' => 213,
                'enroll_type_id' => 1,
                'limit' => 2,
                'start_date' => '2022-11-10 13:35:30',
                'expired_date' => '2022-11-10 13:35:30',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'code' => 'WaucSC5',
                'name' => 'Maria',
                'discount_type' => 'percentage',
                'discount_value' => 393,
                'enroll_type_id' => 1,
                'limit' => 2,
                'start_date' => '2022-11-10 13:35:30',
                'expired_date' => '2022-11-10 13:35:30',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'code' => 'aqJ01ci',
                'name' => 'Maymie',
                'discount_type' => 'percentage',
                'discount_value' => 898,
                'enroll_type_id' => 1,
                'limit' => 2,
                'start_date' => '2022-11-10 13:35:30',
                'expired_date' => '2022-11-10 13:35:30',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [
                'code' => '06JdlM7',
                'name' => 'Mara',
                'discount_type' => 'percentage',
                'discount_value' => 554,
                'enroll_type_id' => 1,
                'limit' => 2,
                'start_date' => '2022-11-10 13:35:30',
                'expired_date' => '2022-11-10 13:35:30',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ],
            [

                'code' => 'nDPGx4X',
                'name' => 'Jared',
                'discount_type' => 'percentage',
                'discount_value' => 785,
                'enroll_type_id' => 1,
                'limit' => 2,
                'start_date' => '2022-11-10 13:35:30',
                'expired_date' => '2022-11-10 13:35:30',
                'created_at' => '2022-11-10 13:35:30',
                'updated_at' => '2022-11-10 13:35:30'
            ]
        ];
        Coupon::insert($data);
    }
}
