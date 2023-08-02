console.log("Función consultarAlbums() ejecutada.");

function consultarAlbums() {
    let servicio = "/albums/data";
    var tabla = document.getElementById("listaalbums");

    let parametros = {
        method: "get",
    };

    fetch(servicio, parametros)
        .then((respuesta) => respuesta.json())
        .then((mensaje) => {
            console.log(mensaje);
            console.log("Respuesta del servidor:", mensaje);

            if (tabla) {
                tabla.innerHTML = "";

                // Deshabilitar los botones al cargar la página
                let modificarElement = document.getElementById("modificar");
                let bajaElement = document.getElementById("baja");
                modificarElement.setAttribute("disabled", "disabled");
                bajaElement.setAttribute("disabled", "disabled");

                if (mensaje.length === 0) {
                    let fila = tabla.insertRow();
                    fila.insertCell().innerHTML = "No hay álbumes.";
                } else {
                    let filaCabecera = tabla.insertRow();
                    filaCabecera.insertCell().innerHTML =
                        "<strong>Título</strong>";
                    filaCabecera.insertCell().innerHTML =
                        "<strong>Año</strong>";

                    mensaje.forEach(function (album) {
                        let fila = tabla.insertRow();
                        fila.insertCell().innerHTML = album.titulo;
                        fila.insertCell().innerHTML = album.year;

                        fila.onclick = function () {
                            let idalbumElement =
                                document.getElementById("idalbum");
                            let tituloElement =
                                document.getElementById("titulo");
                            let yearElement = document.getElementById("year");
                            let modificarElement =
                                document.getElementById("modificar");
                            let bajaElement = document.getElementById("baja");
                            let generoSelect =
                                document.getElementById("idgenero");
                            let artistasSelect =
                                document.getElementById("artistas");

                            if (
                                idalbumElement &&
                                tituloElement &&
                                yearElement &&
                                modificarElement &&
                                bajaElement &&
                                generoSelect &&
                                artistasSelect
                            ) {
                                window.idalbumSeleccionado = album.idalbum;

                                idalbumElement.value = album.idalbum;
                                tituloElement.value = album.titulo;
                                yearElement.value = album.year;

                                // Habilitar los botones cuando se selecciona un álbum
                                modificarElement.removeAttribute("disabled");
                                bajaElement.removeAttribute("disabled");

                                // Mantener seleccionado el género del álbum
                                generoSelect.value = album.idgenero;

                                // Llamar a la función que mantiene seleccionados los artistas
                                consultarArtistasAlbum(album.idalbum);
                            }
                        };
                    });
                }
            }

            // Deshabilitar los botones si no se selecciona ningún álbum
            if (!window.idalbumSeleccionado) {
                let modificarElement = document.getElementById("modificar");
                let bajaElement = document.getElementById("baja");
                modificarElement.setAttribute("disabled", "disabled");
                bajaElement.setAttribute("disabled", "disabled");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function consultarArtistasAlbum(idalbum) {
    let servicio = `/albums/${idalbum}/artistas`;

    fetch(servicio)
        .then((respuesta) => respuesta.json())
        .then((artistas) => {
            let artistasSelect = document.getElementById("artistas");

            // Desmarcar todos los artistas
            for (let i = 0; i < artistasSelect.options.length; i++) {
                artistasSelect.options[i].selected = false;
            }

            // Marcar los artistas del álbum seleccionado
            artistas.forEach((artista) => {
                for (let i = 0; i < artistasSelect.options.length; i++) {
                    if (artistasSelect.options[i].value == artista.idartista) {
                        artistasSelect.options[i].selected = true;
                        break;
                    }
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
}


$(document).ready(function () {
    consultarAlbums();
});

//actualizar tabla album con peticion AJAX
function actualizarTablaAlbums() {
    consultarAlbums();
}
