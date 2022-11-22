<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
 
    // return $request->user();
});

Route::apiResource('users',UserController::class);
Route::apiResource('category',CategoryController::class);
Route::apiResource('subject',SubjectController::class);
Route::apiResource('coupon',CouponController::class);
Route::apiResource('grade',GradeController::class);
Route::apiResource('topic',TopicController::class);
Route::apiResource('course',CourseController::class);
Route::apiResource('pages',PageController::class);
Route::apiResource('testimonials',TestimonialController::class);
Route::apiResource('language',LanguageController::class);