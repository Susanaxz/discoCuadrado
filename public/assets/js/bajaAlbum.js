$("#baja").click(function () {
    let idalbum = document.getElementById("idalbum").value;

    let token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let datos = {
        _token: token,
    };

    let servicio = "/albums/" + idalbum;

    let parametros = {
        method: "DELETE",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json",
        },
    };
    console.log(parametros);
    fetch(servicio, parametros)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            if (data.success) {
                console.log(data.success);
                document.getElementById("mensaje").innerText = data.success;
                // Actualizar la lista de álbumes
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
