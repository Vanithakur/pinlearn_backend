<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Category extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    
    protected $fillable = [
        'name',
        'alias',
        'ordering',
        'image',
        'is_active'
      ];
      public function category()
    {
       $data = $this->belongsToMany(Subject::class,'subjects_categories');
       return $data;
    }
}
