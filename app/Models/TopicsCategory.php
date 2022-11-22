<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopicsCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'topic_id',
        'category_id'
    ];
}
