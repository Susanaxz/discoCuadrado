function consultarArtistas() {
    let servicio = "/artista";
    var tabla = document.getElementById("listaartistas");

    let parametros = {
        method: "get",
    };

    fetch(servicio, parametros)
        .then((respuesta) => respuesta.json())
        .then((mensaje) => {
            console.log(mensaje);
            console.log("Respuesta del servidor:", mensaje);

            // Sólo manipula la tabla si existe
            if (tabla) {
                tabla.innerHTML = "";

                if (mensaje.length === 0) {
                    let fila = tabla.insertRow();
                    fila.insertCell().innerHTML = "No hay artistas.";
                } else {
                    let filaCabecera = tabla.insertRow();
                    filaCabecera.insertCell().innerHTML =
                        "<strong>Nombre</strong>";
                    filaCabecera.insertCell().innerHTML =
                        "<strong>Nacionalidad</strong>";

                    mensaje.forEach(function (artista) {
                        let fila = tabla.insertRow();
                        fila.insertCell().innerHTML = artista.nombre;
                        fila.insertCell().innerHTML = artista.nacionalidad;

                        fila.onclick = function () {
                            let idartistaElement =
                                document.getElementById("idartista");
                            let nombreElement =
                                document.getElementById("nombre");
                            let nacionalidadElement =
                                document.getElementById("nacionalidad");
                            let modificarElement =
                                document.getElementById("modificar");
                            let bajaElement = document.getElementById("baja");

                            if (
                                idartistaElement &&
                                nombreElement &&
                                nacionalidadElement &&
                                modificarElement &&
                                bajaElement
                            ) {
                                window.idartistaSeleccionado =
                                    artista.idartista;

                                idartistaElement.value = artista.idartista;
                                nombreElement.value = artista.nombre;
                                nacionalidadElement.value =
                                    artista.nacionalidad;

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
function llenarComboArtistas() {
    console.log("llenarComboArtistas");
    let servicio = "/artista";

    let datos = new FormData();
    datos.append("peticion", "C");

    let parametros = {
        method: "get",
    };

    fetch(servicio, parametros)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("Error del servidor");
            }
            return respuesta.json();
        })
        .then((artistas) => {
            // Imprime el primer artista para comprobar su estructura
            console.log(artistas[0]);

            let opciones = artistas
                .map((artista) => {
                    return `<option value='${artista.idartista}'>${artista.nombre}</option>`;
                })
                .join("");

            let selectArtistas = document.querySelector("#artistas");
            console.log(selectArtistas);
            if (selectArtistas) {
                selectArtistas.innerHTML = opciones;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

$(document).ready(function () {
    consultarArtistas();
    llenarComboArtistas();
});
