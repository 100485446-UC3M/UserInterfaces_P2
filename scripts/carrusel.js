
$(document).ready(function() {
    let currentIndex = 0;
    const packs = $(".carousel .pack");
    const totalPacks = packs.length;
     const carousel = $(".carousel");

    showPack(currentIndex); // Mostrar el primer pack al inicio

    // Para cambiar cada 2 segundos
    let autoSlide = setInterval(() => $(".next").click(), 2000); // 2000ms = 2 segundos

  // Función para mostrar el pack actual y encontrar su foto
    function showPack(index) {
    const imageUrl = packs.eq(index).data("image"); // Obtenemos la imágen que especificamos en el HTML
    carousel.css("background-image", `url(${imageUrl})`); // Mediante CSS le decimos que la ponga de fondo
    packs.hide(); // Ocultamos todos los packs, es necesario pq si no se van acumulando
    packs.eq(index).slideDown(500);
    }

    // Función para reiniciar el intervalo en caso de click, evvitamos que si hacemos click justo cuando va a cambiar se salte un pack
    function resetInterval() {
    clearInterval(autoSlide);     // Paramos el interval actual
    autoSlide = setInterval(() => $(".next").click(), 2000); // Creamos uno nuevo
    }

  // Botón "Siguiente"
    $(".next").click(function() {
    if (currentIndex ===  totalPacks - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    showPack(currentIndex);
    resetInterval();
    });

    // Botón "Anterior"
    $(".prev").click(function() {
    if (currentIndex === 0) {
        currentIndex = totalPacks - 1;
    } else {
        currentIndex--;
    }
    showPack(currentIndex);
    resetInterval();
    });


    $(".carousel .btn").click(function(event) {
    event.preventDefault(); // Evita la navegación por defecto
    const packName = $(this).closest(".pack").find("h3").text(); //El nombre del pack está en h3
    const imageUrl = $(this).closest(".pack").data("image");
    // Redirigir pasando los datos por query string
    window.location.href = `versionC.html?pack=${encodeURIComponent(packName)}&image=${encodeURIComponent(imageUrl)}`; //Pasarle qué foto poner y qué pack es
    });
});