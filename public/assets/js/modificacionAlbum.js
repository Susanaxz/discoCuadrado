$(document).ready(function () {
    $("#modificar").click(function () {
        let idalbum = document.getElementById("idalbum").value;
        console.log("idalbum: " + idalbum);
        let titulo = document.getElementById("titulo").value;
        let year = document.getElementById("year").value;
        let idgenero = document.getElementById("idgenero").value;
        let artistas = $("#artistas").val();

        let token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        let datos = {
            peticion: "modificacion",
            idalbum: idalbum,
            titulo: titulo,
            year: year,
            idgenero: idgenero,
            artistas: artistas,
            _token: token,
        };

        let servicio = "/albums/" + idalbum;

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
            .then((data) => {
                if (data.success) {
                    console.log(data.success);
                    document.getElementById("mensaje").innerText = data.success;
                    consultarAlbums();
                } else if (data.error) {
                    console.log(data.error);
                    document.getElementById("mensaje").innerText = data.error;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
