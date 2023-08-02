<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AlbumModel;
use Exception;
use Illuminate\Support\Facades\Log;
use App\Models\ArtistaModel;
use Illuminate\Validation\ValidationException;

class AlbumController extends Controller
{
    public function alta(Request $request)
    {
        try {
            // Validar los campos requeridos
            $request->validate([
                'titulo' => 'required',
                'year' => 'required|integer|between:1901,2023',
                'idgenero' => 'required|exists:genero,idgenero|not_in:0',  
                'artistas' => 'required'
            ], [
                'titulo.required' => 'El título es obligatorio',
                'year.required' => 'El año es obligatorio',
                'year.integer' => 'El año debe ser un número',
                'year.between' => 'El año debe estar entre 1901 y 2023',
                'idgenero.required' => 'El género es obligatorio',
                'idgenero.exists' => 'El género seleccionado no existe',
                'idgenero.not_in' => ' debes escoger un género',
                'artistas.required' => 'Debe seleccionar al menos un artista',
            ]);

            $album = new AlbumModel;

            $album->titulo = $request->input('titulo');
            $album->year = $request->input('year');
            $album->idgenero = $request->input('idgenero');

            $album->save();

            $artistasJson = $request->input('artistas');
            Log::info("JSON de artistas: $artistasJson");

            $artistas = json_decode($artistasJson, true);

            if (is_array($artistas)) {
                Log::info("Artist IDs: " . implode(", ", $artistas));
            } else {
                Log::error("No se pudo decodificar los artistas JSON en un array");
            }

            foreach ($artistas as $idartista) {
                $artista = ArtistaModel::find($idartista);
                if ($artista) {
                    $album->artistas()->attach($artista);
                }
            }

            return response()->json(['success' => 'Álbum creado correctamente']);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage() . " in file " . $e->getFile() . " at line " . $e->getLine());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
