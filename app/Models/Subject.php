<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'alias',
        'is_active'
    ];

    
    public function category()
    {
       $data = $this->belongsToMany(Category::class,'subjects_categories');
       return $data;
    }
   
}
