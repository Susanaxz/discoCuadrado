<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtistaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/index', function () {
    return view('index');
})->name('index');


Route::get('/artistas', function () {
    return view('artistas');
})->name('artistas');

Route::get('/albums', function () {
    return view('albums');
})->name('albums');

Route::post('/artista', [ArtistaController::class, 'alta'])->name('artista.alta'); // alta de artista
Route::put('/artista/{idArtista}', [ArtistaController::class, 'modificar'])->name('artista.modificar'); // editar artista
Route::delete('/artista/{idArtista}', [ArtistaController::class, 'eliminar'])->name('artista.eliminar'); // eliminar artista


//mostrar los artistas
Route::get('/artista', [ArtistaController::class, 'getAll'])->name('artista.all');
