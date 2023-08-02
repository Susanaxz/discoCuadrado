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

                            if (
                                idalbumElement &&
                                tituloElement &&
                                yearElement &&
                                modificarElement &&
                                bajaElement
                            ) {
                                window.idalbumSeleccionado = album.idalbum;

                                idalbumElement.value = album.idalbum;
                                tituloElement.value = album.titulo;
                                yearElement.value = album.year;

                                modificarElement.removeAttribute("disabled");
                                bajaElement.removeAttribute("disabled");
                            }
                        };
                    });
                }
            }
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
