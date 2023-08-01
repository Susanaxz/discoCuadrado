<!DOCTYPE html>
<html>

<head>
    <title>Discos</title>
    <meta charset='UTF-8'>
    <link rel="stylesheet" href="{{ asset('assets/css/estilos.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
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
        <form method="POST" action="/artista">

            @csrf
            <input type="hidden" name="idArtista" id='idArtista' />
            <label>Nombre: </label>
            <input type="text" maxlength="100" name="nombre" id="nombre" /><br><br>
            <label>Nacionalidad: </label>

            <select name="nacionalidad" id="nacionalidad"> </select>
            
            <label for="pais">Pais</label>

            <span id="nombre_pais"></span>
            <br><br>
            <center>
                <input type="button" id="alta" name="alta" value="Alta Artista" />
                <input type="button" id="modificar" name="modificar" value="Modificar" disabled />
                <input type="button" id="baja" name="baja" value="Baja artista" disabled />
            </center>

            <p id="mensaje"></p>


        </form>
        <hr>
        <table id='listaartistas'></table><br><br>
    </div>
</body>

<script src=""></script>

<script src="{{ asset('assets/js/altaArtista.js') }}"></script>

<script src="{{ asset('assets/js/modificacionArtista.js') }}"></script>
<script src="{{ asset('assets/js/bajaArtista.js') }}"></script>

<script src="{{ asset('assets/js/consultaArtista.js') }}"></script>

<script src="{{ asset('assets/js/paises.js') }}"></script>
<script>
    $(document).ready(function() {
        $('#nacionalidad').on('change', function() {
            var codigo = $(this).val();
            var pais = obtenerNombrePais(codigo);
            $('#nombre_pais').text(pais);

        });
    });

</script>
<script>
    $(document).ready(function() {
    consultarArtistas();
    });
</script>


</html>