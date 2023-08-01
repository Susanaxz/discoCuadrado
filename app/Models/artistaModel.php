<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\database;

class ArtistaModel extends Model
{
    use HasFactory;

    protected $table = 'artista';

    public $timestamps = false;
    
    protected $fillable = [
        'nombre',
        'nacionalidad'
    ];

    public function alta($datos)
    {
        try {
            $respuesta = $this->create($datos);
            return array('codigo' => '0000', 'mensaje' => 'Alta exitosa', 'respuesta' => $respuesta);
        } catch (Exception $e) {
            return array('codigo' => $e->getCode(), 'error' => $e->getMessage());
        }
    }

    public function modificar($datos)
    {
        try {
            $id = $datos['id'];
            $nombre = $datos['nombre'];
            $nacionalidad = $datos['nacionalidad'];

            $respuesta = $this->where('idArtista', $id)->update(['nombre' => $nombre, 'nacionalidad' => $nacionalidad]);
            return array('codigo' => '0000', 'mensaje' => 'Modificacion exitosa', 'respuesta' => $respuesta);
        } catch (Exception $e) {
            return array('codigo' => $e->getCode(), 'error' => $e->getMessage());
        }
    }

    public function eliminar($id)
    {
        try {
            $respuesta = $this->where('idArtista', $id)->delete();
            return array('codigo' => '0000', 'mensaje' => 'Eliminacion exitosa', 'respuesta' => $respuesta);
        } catch (Exception $e) {
            return array('codigo' => $e->getCode(), 'error' => $e->getMessage());
        }
    }

}
