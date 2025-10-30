$(document).ready(function() {
    $("#login-form").submit(function(e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        const userInfo = JSON.parse(localStorage.getItem(username));
        if (userInfo === null || userInfo["password"] !== password){
            alert("El usuario no existe o la contraseña no coincide");
            return;
        }

        window.location.href = "versionB.html?login=" + encodeURIComponent(username);
    });
});