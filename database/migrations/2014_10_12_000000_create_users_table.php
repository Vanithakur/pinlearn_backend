<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('fullname');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('username')->unique();
            $table->text('avatar_image')->nullable();
            $table->text('address')->nullable();
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('zipcode')->nullable();
            $table->bigInteger('phone')->nullable();       
            $table->string('youtube_id')->nullable();
            $table->integer('language_id')->unsigned()->nullable();
            $table->text('biography')->nullable();
            $table->text('verify_token')->nullable();         
            $table->integer('commision_rate')->nullable();
            $table->enum('is_email_verified',[0,1])->default(0);
            $table->enum('is_featured',[0,1])->default(0);
            $table->enum('is_phone_verified',[0,1])->default(0);
            $table->enum('in_home_page',[0,1])->default(0);
            $table->enum('status',['Approved','Rejected','Pending'])->default('Pending');
            $table->enum('action',['Activated','Deactivated'])->default('Activated');
            $table->timestamps();
            $table->foreign('language_id')->references('id')->on('languages');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
