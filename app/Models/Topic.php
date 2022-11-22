<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'alias'
    ];
    public function category()
    {
       $data = $this->belongsToMany(Category::class,'topics_categories');
       return $data;
    }
    public function subject()
    {
       $data = $this->belongsToMany(Subject::class,'topics_subjects');
       return $data;
    }
}
