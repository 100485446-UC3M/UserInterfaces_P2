$(document).ready(function() {
    // Función para leer parámetros de la URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const packName = getQueryParam("pack");
    const imageUrl = getQueryParam("image");

    if (packName) {
        $("#pack-title").text(packName);
    }

    if (imageUrl) {
        $("#pack-image").attr("src", imageUrl);
    }


    const descriptions = {
        "Descubre Croacia": "Embárcate en un viaje inolvidable a Croacia, donde la historia y la belleza natural se encuentran en cada esquina. Durante 7 días recorrerás Dubrovnik, Split y Zadar, explorando murallas medievales, palacios históricos y playas de aguas cristalinas. El paquete incluye alojamiento en hoteles céntricos, transporte interno y excursiones guiadas. Todo esto por $500, con salida programada para el 15 de julio. ¡Descubre la perla del Adriático y vive la magia mediterránea como nunca antes!",
        "Aventura en Tailandia": "Vive la exótica Tailandia en un recorrido de 10 días por Bangkok, Chiang Mai y Phuket. Descubre templos milenarios, mercados flotantes y playas paradisíacas. El paquete incluye alojamiento, transporte interno, guía local y actividades como paseo en elefante y clases de cocina tailandesa. Precio: $750, con salida el 5 de agosto. Sumérgete en una cultura vibrante y en paisajes de ensueño que no olvidarás jamás.",
        "Explorando Nueva Zelanda": "Aventura total en Nueva Zelanda durante 12 días, visitando Auckland, Rotorua y Queenstown. Disfruta de senderismo, paisajes de montañas y lagos cristalinos, y excursiones de aventura como bungee y kayak. Incluye alojamiento, transporte, excursiones guiadas y entradas a parques nacionales. Todo por $900, con salida el 20 de septiembre. Vive la naturaleza en estado puro y explora los escenarios que inspiraron a los cineastas de “El Señor de los Anillos”.",
        "Ven a Argentina": "Descubre lo mejor de Argentina en un viaje de 9 días por Buenos Aires, Mendoza y Bariloche. Disfruta de cultura, gastronomía, viñedos y paisajes increíbles de la Patagonia. El paquete incluye alojamiento, transporte interno, guía turístico y actividades seleccionadas, como cata de vinos y excursión a glaciares. Precio: $600, con salida el 10 de octubre. Una experiencia única que combina aventura, relax y tradición argentina."
    };

    if(packName && descriptions[packName]) {
        $("#pack-info").text(descriptions[packName]);
    }

    //En este caso vamos a crear una lista que aparezca debajo del formulario con los errores de los datos introducidos

    $("#purchase-form").submit(function(e) {
        e.preventDefault();

        function mostrarErrores(errores) {
            const $m = $("#mensaje");
            if (!errores || errores.length === 0) {
                $m.hide(); // Limpiar mensajes anteriores
            return;
            }

            const $ul = $("<ul>").addClass("error-list");
            errores.forEach(error => {
                $ul.append($("<li>").text(error));
                });

            $m.append($ul).show();
        }

        // limpiar errores previos
        $("#mensaje").empty().hide();

        const nombre = $("#Nombre").val().trim();
        const email = $("#email").val().trim();
        const cardtype = $("#card-type").val().trim();
        const cardnumber = $("#card-number").val().trim();
        const cardname = $("#card-name").val().trim();
        const cardexpiration = $("#card-expiration").val().trim();
        const cardcvv = $("#card-cvv").val().trim();

        const errores = [];

        if (nombre.length < 3) {
            errores.push("El nombre debe tener al menos 3 caracteres.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            errores.push("El formato del correo electrónico no es válido.");
        }

        if (cardtype === "") {
            errores.push("Debes seleccionar un tipo de tarjeta.");
        }

        if (!/^(?:\d{13}|\d{15}|\d{17}|\d{19})$/.test(cardnumber)) {
            errores.push("El número de tarjeta debe tener 13, 15, 17 o 19 dígitos.");
        }

        if (cardname.length < 3) {
            errores.push("El nombre del titular debe tener al menos 3 caracteres.");
        }

        const today = new Date();
        today.setHours(0,0,0,0);
        const expDate = cardexpiration ? new Date(cardexpiration) : NaN;
        if (!cardexpiration || isNaN(expDate.getTime())) {
            errores.push("Debes introducir una fecha de caducidad válida.");
        } else {
            expDate.setHours(0,0,0,0);
            if (expDate < today) {
                errores.push("La fecha de caducidad no puede ser anterior a la actual.");
            }
        }

        if (!/^\d{3}$/.test(cardcvv)) {
            errores.push("El CVV debe tener exactamente 3 dígitos.");
        }

        if (errores.length > 0) {
            mostrarErrores(errores);
            return;
        }

        $("#mensaje").empty().removeClass("show").addClass("success").append(
            $("<div>").addClass("success-msg").text("Compra realizada con éxito.")
        ).show();

        setTimeout(() => {
            alert("Compra realizada con éxito.");
            $("#purchase-form")[0].reset();
        }, 3000);

    });

});

