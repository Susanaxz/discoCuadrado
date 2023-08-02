$(document).ready(function () {
    $("#modificar").click(function () {
        let id = document.getElementById("idartista").value;

        console.log("idartista: " + id);
        let nombre = document.getElementById("nombre").value;
        let nacionalidad = document.getElementById("nacionalidad").value;

        // Inicializar token aquí
        let token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        let datos = {
            peticion: "modificacion",
            idartista: id,
            nombre: nombre,
            nacionalidad: nacionalidad,
            _token: token,
        };

        let servicio = "/artista/" + id;

        let parametros = {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log(parametros);
        console.log(datos);
        fetch(servicio, parametros)
            .then((respuesta) => respuesta.json())
            .then((mensaje) => {
                let codigo = mensaje.codigo;
                let error = mensaje.mensaje;


                if (codigo == "0000") {
                    console.log("Artista modificado correctamente");
                    document.getElementById("mensaje").innerText =
                        "Artista modificado correctamente";
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
