<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneroModel extends Model
{
    use HasFactory;

    protected $table = 'genero';

    public $timestamps = false;

    protected $primaryKey = 'idgenero';

    protected $fillable = [
        'genero'
    ];
}
