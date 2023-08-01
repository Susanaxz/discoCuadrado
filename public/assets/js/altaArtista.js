$(document).ready(function () {
    $("#alta").click(function () {
        let servicio = "/artista";
        let datos = new FormData();

        let nombre = document.getElementById("nombre").value;
        let nacionalidad = document.getElementById("nacionalidad").value;

        datos.append("peticion", "alta");
        datos.append("nombre", nombre);
        datos.append("nacionalidad", nacionalidad);

        let token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        datos.append("_token", token);

        let parametros = {
            method: "post",
            body: datos,
        };

        fetch(servicio, parametros)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    if (respuesta.status === 422) {
                        return respuesta.json().then((data) => {
                            throw new Error(
                                Object.values(data.errors).join(" ")
                            );
                        });
                    }
                    throw new Error("Error del servidor");
                }
                return respuesta.json();
            })
            .then((mensaje) => {
                let codigo = mensaje.codigo;
                let error = mensaje.mensaje;

                if (codigo == "0000") {
                    console.log("Artista insertado correctamente");
                    document.getElementById("mensaje").innerText =
                        "Artista insertado correctamente";
                    consultarArtistas(); 
                } else {
                    console.log(error);
                    document.getElementById("mensaje").innerText = error;
                }
            })
            .catch((error) => {
                console.log(error);
                document.getElementById("mensaje").innerText = error.message;
            });
    });
});

