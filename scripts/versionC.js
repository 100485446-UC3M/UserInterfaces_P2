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
    });