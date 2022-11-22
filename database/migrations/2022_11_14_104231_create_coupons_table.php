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
        Schema::create('coupons', function (Blueprint $table) {
            $table->increments('id');
            $table->text('code');
            $table->string('name');
            $table->enum('discount_type',['percentage','money']);
            $table->integer('discount_value');
            $table->integer('enroll_type_id')->unsigned();
            $table->integer('limit');
            $table->dateTime('start_date');
            $table->dateTime('expired_date');
            $table->timestamps();
            $table->foreign('enroll_type_id')->references('id')->on('enroll_types')->constrained('enroll_types')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coupons');
        
    }
};
