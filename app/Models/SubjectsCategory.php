<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectsCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'subject_id',
        'category_id'
    ];
}
