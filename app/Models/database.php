<?php

namespace App\Models;

use Doctrine\DBAL\Driver\Mysqli\Initializer\Charset;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PDO;
use PDOException;
use Exception;



class database extends Model
{
    use HasFactory;

    protected $conexion;
    public function __construct() {
        try {
            $dsn = "mysql:host=localhost; dbname=discos; charset=UTF8";
            $this->conexion = new PDO($dsn, 'root', '');
            $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            throw new Exception($e->getMessage());
        }
    }
}

        