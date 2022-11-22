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
        Schema::create('courses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('description');
            $table->string('image');
            $table->string('video_url');
            $table->enum('payment_type',['free','paid']);
            $table->integer('enroll_type_id')->unsigned();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->enum('status',['Pending','Approved']);
            $table->integer('price');
            $table->integer('age');
            $table->integer('grade_id')->unsigned();          
            $table->integer('user_id')->unsigned();
            $table->timestamps();
            $table->foreign('enroll_type_id')->references('id')->on('enroll_types')->constrained('enroll_types')->onDelete('cascade');
            $table->foreign('grade_id')->references('id')->on('grades')->constrained('grades')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
};
