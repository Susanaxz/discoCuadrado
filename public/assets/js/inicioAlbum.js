document.addEventListener("DOMContentLoaded", function () {
    fetch("/artista")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error del servidor");
            }
            return response.json();
        })
        .then((data) => {
            let artistas = data.artistas;
            let artistasSelect = document.getElementById("artistas");
            if (artistas && artistasSelect) {
                artistas.forEach((artista) => {
                    let option = document.createElement("option");
                    option.value = artista.id;
                    option.text = artista.nombre;
                    artistasSelect.appendChild(option);
                });
            }
        })
        .catch((error) => {
            console.error(
                "Error al cargar los artistas en el formulario de alta de álbum:",
                error
            );
        });

    // Listener para el botón de alta
    document.querySelector("#alta").addEventListener("click", function () {
        // Llenar los campos de genero y artistas
        consultaGenero();
        consultaArtistas();
    });
});
