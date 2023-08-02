$(document).ready(function () {
    $("#alta").click(function () {
        // Definir servicio
        let servicio = "/albums";

        // Recuperar valores de los campos
        let titulo = document.getElementById("titulo").value;
        let year = document.getElementById("year").value;
        let idgenero = document.getElementById("idgenero").value;
        let artistas = document.querySelectorAll("#artistas option:checked");
        let arrayArtistas = [];

        // Iterar sobre los artistas seleccionados para extraer los valores
        artistas.forEach((item) => {
            if (item.value !== undefined) {
                arrayArtistas.push(item.value);
            }
        });

        // Verifica si hay al menos un artista seleccionado
        if (arrayArtistas.length === 0) {
            document.getElementById("mensaje").innerText =
                "Por favor, selecciona al menos un artista";
            return;
        }

        let datos = new FormData();
        datos.append("peticion", "alta");
        datos.append("titulo", titulo);
        datos.append("year", year);
        datos.append("idgenero", idgenero);
        datos.append("artistas", JSON.stringify(arrayArtistas));

        let token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        datos.append("_token", token);

        let parametros = {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": token,
            },
            body: datos,
        };

        // Realizar la petición
        fetch(servicio, parametros)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 422) {
                        return response.json().then((data) => {
                            console.error("Error 422:", data);
                            
                            // Unir los mensajes de error con un salto de línea
                            let errorMessage = Object.values(data.errors).join(
                                "\n"
                            );
                            throw new Error(errorMessage);
                        });
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // En caso de éxito, limpiar formulario y mostrar mensaje
                if (data.success) {
                    document.getElementById("mensaje").innerText = data.success;
                    document.getElementById("titulo").value = "";
                    document.getElementById("year").value = "";
                    document.getElementById("idgenero").value =
                        "Selecciona un género";
                    consultarAlbums(); // Actualizar tabla
                }
                if (data.error) {
                    // En caso de error, mostrar mensaje
                    document.getElementById("mensaje").innerText = data.error;
                }
            })
            .catch((error) => {
                // En caso de error, mostrar mensaje
                console.log("Error:", error);
                console.log("Error data:", error.message);
                document.getElementById("mensaje").innerText = error.message;
            });
    });
});
