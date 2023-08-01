function consultarArtistas() {
    let servicio = "/artista";
var tabla = document.getElementById("listaartistas");
    

    let datos = new FormData(); // Esto es un objeto de tipo formulario de HTML

    datos.append("peticion", "consultar");

     let parametros = {
         method: "get",
    };
    
    fetch(servicio, parametros)
        .then((respuesta) => respuesta.json())
        .then((mensaje) => {
            console.log(mensaje);

            // Limpia la tabla antes de agregar los nuevos datos.
            tabla.innerHTML = "";

            if (mensaje.length === 0) {
    let fila = tabla.insertRow();
    fila.insertCell().innerHTML = "No hay artistas.";
} else {
    // Agregar las cabeceras a la tabla
    let filaCabecera = tabla.insertRow();
    filaCabecera.insertCell().innerHTML = "<strong>Nombre</strong>";
    filaCabecera.insertCell().innerHTML = "<strong>Nacionalidad</strong>";
    
    mensaje.forEach(function (artista) {
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = artista.nombre;
        fila.insertCell().innerHTML = artista.nacionalidad;
        
        // Añadir evento de clic a la fila para seleccionar el artista
        fila.onclick = function() {
            // Almacenar idArtista en una variable global
            window.idArtistaSeleccionado = artista.idArtista;

            // Completar el formulario con los datos del artista
            document.getElementById("idArtista").value = artista.idArtista;

            document.getElementById('nombre').value = artista.nombre;
            document.getElementById('nacionalidad').value = artista.nacionalidad;

            // Habilitar los botones de modificar y eliminar
            document.getElementById('modificar').removeAttribute('disabled');
            document.getElementById('baja').removeAttribute('disabled');
        };
    }); 
            }

        })  
        .catch((error) => {
            console.log(error);
        }
    );
}