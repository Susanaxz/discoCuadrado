// Definimos la función en el ámbito global.
function consultarGenero() {
    var url = $("#idgenero").data("url");
    $.ajax({
        url: url,
        method: "GET",
        success: function (data) {
            var options =
                "<option value='0' disabled selected>Seleccione un género</option>";
            data.forEach(function (genero) {
                options += `<option value='${genero.idgenero}'>${genero.genero}</option>`;
            });
            $("#idgenero").html(options);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

$(document).ready(function () {
    // Ahora podemos llamar a consultarGenero sin problemas.
    consultarGenero();

    // Listener para el botón de alta
    document.querySelector("#alta").addEventListener("click", function () {
        // Llenar los campos de genero y artistas
        consultarGenero();
    });
});
