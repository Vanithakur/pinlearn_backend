<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'image',
        'video_url',
        'payment_type',
        'enroll_type_id',
        'start_time',
        'end_time',
        'status',
        'price',
        'age',
        'grade_id',
        'user_id'
    ];
    public function languages()
    {
       return $this->belongsTo(Language::class,'language_id');
    }
    // public function languages()
    // {
    //    return $this->belongsTo(Language::class,'language_id');
    // }
}
