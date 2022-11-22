<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // role
        $adminRole = Role::create(['name' => 'Admin', 'description' => 'admin_role']);
        $tutorRole = Role::create(['name' => 'Tutor', 'description' => 'tutor_role']);
        $studentRole = Role::create(['name' => 'Student', 'description' => 'student_role']);

        // print_r($adminRole);
        $admin = User::create([
            'fullname'=> 'admin',
            'username'=> 'admin',
            'email' => 'admin@livelearn.info',
            'password' => bcrypt('livelearn.info')
        ]);

        $tutor = User::create([
            'fullname'=> 'tutor',
            'username'=> 'tutor',
            'email' => 'jonas2411@yahoo.com',
            'password' => bcrypt('123456')
        ]);

        $student = User::create([
            'fullname'=> 'student',
            'username'=> 'student',
            'email' => 'priyainstarama@gmail.com',
            'password' => bcrypt('123456')
        ]);        

        $adminRole = UserRole::create(['user_id' => $admin->id, 'role_id' => $adminRole->id]);
        $tutorRole = UserRole::create(['user_id' => $tutor->id, 'role_id' => $tutorRole->id]);
        $studentRole = UserRole::create(['user_id' => $student->id, 'role_id' => $studentRole->id]);
    }
}
