function buscarAlbum() {
    const termino = document.getElementById("buscar").value;
    if (!termino) {
        actualizarTablaAlbums(); 
        return;
    }

    let servicio = `/albums/buscar/${termino}`;

    fetch(servicio)
        .then((respuesta) => respuesta.json())
        .then((mensaje) => {
            let tabla = document.getElementById("listaalbums");

            if (tabla) {
                tabla.innerHTML = "";

                // Deshabilitar los botones al cargar la página
                let modificarElement = document.getElementById("modificar");
                let bajaElement = document.getElementById("baja");
                modificarElement.setAttribute("disabled", "disabled");
                bajaElement.setAttribute("disabled", "disabled");

                if (mensaje.length === 0) {
                    let fila = tabla.insertRow();
                    fila.insertCell().innerHTML = "No se encontraron álbumes.";
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
        });
}
