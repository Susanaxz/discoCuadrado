<!DOCTYPE html>
<html>

<head>
    <title>Discos</title>
    <meta charset='UTF-8'>
    <link rel="stylesheet" href="{{ asset('assets/css/estilos.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">

    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">





</head>

<body>
    <div class='wraper'>
        <nav>
            <a href="{{ route('index') }}">Home</a>
            <a href="{{ route('artistas') }}">Artistas</a>
            <a href="{{ route('albums') }}">Albums</a>

        </nav>
        <h2 class='centrar'>Discográfica El disco cuadrado</h2>
        <form id='formulario'>
            <input type="hidden" name="idalbum" id='idalbum' />
            <label>Título: </label>
            <input type="text" maxlength="100" name="titulo" id="titulo" /><br><br>
            <label>Año: </label>
            <input type="number" maxlength="4" name="year" id="year" />
            <br><br>
            <label>Género: </label>
            <select name="genero" id="genero">
                <option value='0' disabled selected>Seleccione un género</option>
                <option value='1'>pop</option>
                <option value='2'>rock</option>
                <option value='4'>jazz</option>
                <option value='5'>clásica</option>
                <option value='6'>heavy</option>
                <option value='7'>ligera</option>
                <option value='8'>bso</option>
                <option value='9'>étnica</option>
                <option value='10'>trash</option>
                <option value='11'>ópera</option>
            </select>
            <br><br>
            <label>Artista/s: </label>
            <select name="artistas" id="artistas" multiple size='5'>

            </select>
            <br><br>
            <center>
                <input type="button" id="alta" value="Alta Album" />
                <input type="button" id="modificar" value="Modificar" disabled />
                <input type="button" id="baja" value="Baja álbum" disabled />
            </center>
        </form>
        <hr>
        <form id='buscador'>
            <label>Buscar: </label>
            <input type='text' id='buscar'></input>
        </form>
        <hr>
        <table id='listaalbums'></table><br><br>
        <div class='centrar' id='paginas'></div>
    </div>
</body>

</html>