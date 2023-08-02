<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\artistaModel;
use Exception;
use App\Models\AlbumModel;


class ArtistaController extends Controller
{
    public function alta(Request $request)
    {
        try
        {
            $customMessages = [
                'nombre.required' => 'Debes proporcionar un nombre',
                'nacionalidad.required' => 'Debes escoger una nacionalidad',
            ];

            $validacion = $request->validate([
                'nombre' => 'required',
                'nacionalidad' => 'required'
            ], $customMessages);

            $nombre = mb_convert_case(trim($request->input('nombre')), MB_CASE_TITLE, "UTF-8");
            $nacionalidad = $request->input('nacionalidad');

            $existeArtista = ArtistaModel::where('nombre', $nombre)->first();

            if ($existeArtista) {
                // Si el artista ya existe, devuelve un error
                return response()->json(['codigo' => '400', 'mensaje' => 'Artista ya incluido en la base de datos']);
            }

            // crear el objeto
            $artista = new artistaModel();

            // llamamos al metodo para insertar
            $datos = compact('nombre', 'nacionalidad');
            $respuesta = $artista->alta($datos); // llamamos al metodo de alta

            // retornamos la respuesta
            return response()->json($respuesta);
        } catch (Exception $e) {
            $respuesta = array('codigo' => $e->getCode(), 'error' => $e->getMessage());
            return response()->json($respuesta);
        }
    }

    public function getAll()
    {
        $artistas = ArtistaModel::all(); // all() es el metodo para obtener todos los registros
        
        return response()->json($artistas); // retornamos la respuesta
    }

    public function modificar(Request $request)
    {
        try {
            $validacion = $request->validate([
                'idartista' => 'required',
                'nombre' => 'required',
                'nacionalidad' => 'required'
            ]);

            $id = $request->input('idartista');
            $nombre = ucwords(trim($request->input('nombre')));
            $nacionalidad = $request->input('nacionalidad');
            

            // crear el objeto
            $artista = new artistaModel();

            // llamamos al metodo para modificar
            $datos = compact('id', 'nombre', 'nacionalidad');
            $respuesta = $artista->modificar($datos);

            // retornamos la respuesta
            return response()->json($respuesta);
        } catch (Exception $e) {
            $respuesta = array('codigo' => $e->getCode(), 'error' => $e->getMessage());
            return response()->json($respuesta);
        }
    }

    public function eliminar(Request $request)
    {
        try {
            $validacion = $request->validate([
                'idartista' => 'required'
            ]);

            $id = $request->input('idartista');

            // crear el objeto
            $artista = new artistaModel();

            // llamamos al metodo para eliminar
            $respuesta = $artista->eliminar($id);

            // retornamos la respuesta
            return response()->json($respuesta);
        } catch (Exception $e) {
            $respuesta = array('codigo' => $e->getCode(), 'error' => $e->getMessage());
            return response()->json($respuesta);
        }
    
    }

    public function getArtistasByAlbum($idalbum)
    {
        try {
            $album = AlbumModel::find($idalbum);
            if (!$album) {
                return response()->json(['codigo' => '400', 'mensaje' => 'Álbum no encontrado']);
            }

            $artistas = $album->artistas; 

            return response()->json($artistas);
        } catch (Exception $e) {
            $respuesta = array('codigo' => $e->getCode(), 'error' => $e->getMessage());
            return response()->json($respuesta);
        }
    }
}

    
