<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GeneroModel;

class GeneroController extends Controller
{
    public function index()
    {
        $generos = GeneroModel::all();
        return response()->json($generos);
    }}
