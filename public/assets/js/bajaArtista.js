$(document).ready(function () {
    $("#baja").click(function () {
        let id = document.getElementById("idartista").value;
        let servicio = "/artista/" + id;
        let token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        let datos = {
            peticion: "baja",
            idartista: id,
            _token: token,
        };
        let parametros = {
            method: "DELETE",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(servicio, parametros)
            .then((respuesta) => respuesta.json())
            .then((mensaje) => {
                let codigo = mensaje.codigo;
                let error = mensaje.mensaje;
                if (codigo == "0000") {
                    console.log("Artista eliminado correctamente");
                    document.getElementById("mensaje").innerText =
                        "Artista eliminado correctamente";
                    consultarArtistas();
                } else {
                    console.log(error);
                    document.getElementById("mensaje").innerText = error;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
