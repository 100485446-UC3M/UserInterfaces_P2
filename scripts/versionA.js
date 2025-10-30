
$(document).ready(function() {

    // Para que el mensaje desaparezca despues de un tiempo
    function showMessage(text, duration = 4000, color = "") {
        const $m = $("#mensaje");
        if (color) $m.css("color", color);
        $m.stop(true, true).text(text).slideDown(200);
        // evita múltiples timeouts concurrentes
        const prev = $m.data("timeout");
        if (prev) clearTimeout(prev);
        const t = setTimeout(() => $m.slideUp(400), duration);
        $m.data("timeout", t);
    }

    $("#privacy-check").change(function() {
        $("#submitBtn").prop("disabled", !this.checked); // Habilita o deshabilita el botón según el checkbox
    });

    $("#register-form").submit(function(e) {
        e.preventDefault();

        const nombre = $("#Nombre").val().trim();
        const apellidos = $("#Apellido").val().trim()
        const apellidosPartes = apellidos.split(/\s+/); //Se utiliza regex para considerar múltiples espacios
        const email = $("#email").val().trim();
        const emailconfirm = $("#emailconfirm").val().trim();
        const birthday = $("#birthday").val().trim();
        const login = $("#login").val().trim();
        const password = $("#password").val().trim();
        const foto = $("#foto").prop("files")[0];

        // Limpia mensajes anteriores
        $("#mensaje").text("").css("color", "");

        if (nombre.length < 3) {
            showMessage("El nombre debe tener al menos 3 caracteres.", 4000, "red");
            return;
        }

        if (apellidosPartes.length < 2 || apellidosPartes.some(a => a.length < 3)){
            showMessage("Debe ingresar al menos dos apellidos de 3 letras cada uno.", 4000, "red");
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            showMessage("El formato del correo electrónico no es válido.", 4000, "red");
            return;
        }

        if (!/^[^\s@]+@[^\s\.@]+\.[^\s\.@]+$/.test(emailconfirm)){
            showMessage("El formato del correo electrónico no es válido.", 4000, "red");
            return;
        }

        if (email !== emailconfirm) {
            showMessage("Los correos no coinciden.", 4000, "red");
            return;
        }

        if (!birthday || new Date(birthday) > new Date()){ //La fecha no puede ser posterior al día de hoy
            showMessage("Fecha de nacimiento no válida.", 4000, "red");
            return;
        }

        if (login.length < 5){
            showMessage("El login debe tener al menos 5 caracteres.", 4000, "red");
            return;
        }
        
        if (!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[!@#$%^&*]/.test(password)
            && /[0-9].*[0-9]/.test(password) && password.length === 8)){ //Se realiza con lookaheads y definiendo el mínimo de caracteres
            showMessage("La contraseña debe tener 8 caracteres, 2 números, 1 carácter especial, 1 mayúscula y 1 minúscula.", 4000, "red");
            return;
        }
        
        if (!foto) {
            showMessage("Debe subir una imagen de perfil.", 4000, "red");
            return;
        }

        const validFormats = ["image/webp", "image/png", "image/jpeg", "image/jpg"];

        if (!validFormats.includes(foto.type)){
            showMessage("Solo se permiten archivos .webp, .png, .jpeg o .jpg.", 4000, "red");
            return;
        }

        // Éxito: mostrar mensaje 4s y luego redirigir
        showMessage("Registro exitoso.", 3000, "green");

        localStorage.setItem(login, JSON.stringify({ "nombre": nombre, "apellidos": apellidos, "email": email,
            "birthday": birthday, "password": password, "foto": URL.createObjectURL(foto)
        }));

        // Redirigir después de que el mensaje desaparezca (4s + pequeño margen)
        setTimeout(() => {
            window.location.href = "versionB.html?login=" + encodeURIComponent(login);
        }, 4400);
    });
});