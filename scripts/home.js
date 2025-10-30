$(document).ready(function() {
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

    $("#login-form").submit(function(e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        const userInfo = JSON.parse(localStorage.getItem(username));
        if (userInfo === null || userInfo["password"] !== password){
            alert("El usuario no existe o la contraseña no coincide");
            return;
        }

        window.location.href = "versionB.html?login=" + username;
    });
});