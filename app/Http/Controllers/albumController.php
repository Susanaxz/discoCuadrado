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

    public function getAll()
    {
        $albums = AlbumModel::all();

        return response()->json($albums);
    }

    public function modificar(Request $request, $idalbum)
    {
        try {
            $album = AlbumModel::find($idalbum);

            $album->titulo = $request->input('titulo');
            $album->year = $request->input('year');
            $album->idgenero = $request->input('idgenero');

            $album->save();

            $artistasInput = $request->input('artistas');

            if (is_string($artistasInput)) {
                $artistas = json_decode($artistasInput, true);
                Log::info('Decodificado de JSON: ' . json_encode($artistas));
            } elseif (is_array($artistasInput)) {
                $artistas = $artistasInput;
                Log::info('Recibido como array: ' . json_encode($artistas));
            } else {
                throw new Exception('El contenido de la petición no es ni una cadena ni un array.');
            }

            foreach ($artistas as $idartista) {
                $artista = ArtistaModel::find($idartista);
                if ($artista) {
                    Log::info("Artista encontrado con ID: $idartista");
                    $idArtistas[] = $artista->idartista;
                } else {
                    Log::warning("No se pudo encontrar un artista con ID: $idartista");
                }
            }
            $album->artistas()->sync($idArtistas);

            return response()->json(['success' => 'Álbum modificado correctamente']);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminar($idalbum)
    {
        try {
            $album = AlbumModel::find($idalbum);

            if ($album) {
                // Primero eliminamos la relación en la tabla intermedia
                $album->artistas()->detach();
                // Luego eliminamos el álbum
                $album->delete();

                return response()->json(['success' => 'Álbum eliminado correctamente']);
            } else {
                throw new Exception('El álbum no existe');
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
