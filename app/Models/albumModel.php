<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlbumModel extends Model
{
    use HasFactory;


    protected $table = 'album';
    

    protected $fillable = [
        'titulo',
        'year',
        'idGenero',
    ];

    public $timestamps = false;

    // public function alta($titulo, $year, $idgenero)
    // {
    //     $album = new albumModel;

    //     $album->titulo = $titulo;
    //     $album->year = $year;
    //     $album->idgenero = $idgenero;

    //     $album->save();
    // }
   

    public function artistas()
    {
        return $this->belongsToMany(ArtistaModel::class, 'relartistaalbum', 'idalbum', 'idartista');
    }

}
