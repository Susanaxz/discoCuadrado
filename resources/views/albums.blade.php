<!DOCTYPE html>
<html>

<head>
    <title>Discos</title>
    <meta charset='UTF-8'>
    <link rel="stylesheet" href="{{ asset('assets/css/estilos.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">


</head>

<body>
    <div class='wraper'>
        <nav>
            <a href="{{ route('index') }}">Home</a>
            <a href="{{ route('artistas') }}">Artistas</a>
            <a href="{{ route('albums') }}">Albums</a>

        </nav>
        <h2 class='centrar'>Discográfica El disco cuadrado</h2>
        <form id='formulario' method="POST" action="/albums">
            @csrf

            <input type="hidden" name="idalbum" id='idalbum' />
            <label>Título: </label>
            <input type="text" maxlength="100" name="titulo" id="titulo" /><br><br>
            <label>Año: </label>
            <input type="number" maxlength="4" name="year" id="year" />
            <br><br>
            <label>Género: </label>
            <select name="idgenero" id="idgenero" data-url="{{ route('generos.index') }}">
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

            <p id="mensaje"></p>

        </form>
        <hr>
        <table id='listaalbums'></table><br><br>
        <div class='centrar' id='paginas'></div>
    </div>
</body>

<script src="{{ asset('assets/js/altaAlbum.js') }}"></script>
<script src="{{ asset('assets/js/bajaAlbum.js') }}"></script>
<script src="{{ asset('assets/js/modificacionAlbum.js') }}"></script>
<script src="{{ asset('assets/js/consultaAlbum.js') }}"></script>
<script src="{{ asset('assets/js/consultaGenero.js') }}"></script>
<script src="{{ asset('assets/js/consultaArtista.js') }}"></script>
<script src="{{ asset('assets/js/inicioAlbum.js') }}"></script>

<script>
    $(document).ready(function() {
        consultarArtistas();
    });

</script>
<script>

    $(document).ready(function() {
    consultarGenero();
    });

</script>



</html>