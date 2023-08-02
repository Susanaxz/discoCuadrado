<!DOCTYPE html>
<html>

<head>
    <title>Discos</title>
    <meta charset='UTF-8'>
    <link rel="stylesheet" href="{{ asset('assets/css/estilos.css') }}">

<meta name="csrf-token" content="{{ csrf_token() }}">


    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">


</head>

<body>
    <div class='wraper'>
        <nav>
            <a href="{{ route('artistas') }}">Artistas</a>
            <a href="{{ route('albums') }}">Albums</a>

        </nav>
        <h2 class='centrar'>Discográfica El disco cuadrado</h2>
        <div class='centrar'>
            <img src="{{ asset('assets/img/discos.png') }}">
        </div>
    </div>
</body>
<script>


</script>

</html>