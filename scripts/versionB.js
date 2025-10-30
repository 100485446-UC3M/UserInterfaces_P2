function updateTipList(tipList){
    const tipLinks = $("#tip-list");
    tipLinks.empty();
    for (var i = tipList.length - 1; i > tipList.length - 4 && i > -1; i--){
        tipLinks.append('<li><a href="#">' + tipList[i]["title"] + '</a></li>');
    }
}

$(document).ready(function() {
    const username = new URLSearchParams(window.location.search).get("login");
    const userInfo = JSON.parse(localStorage.getItem(username));
    const tipList = JSON.parse(localStorage.getItem("consejos") ?? "[]")

    updateTipList(tipList);

    $("#userNameSurname").text(userInfo["nombre"] + " " + userInfo["apellidos"]);
    $("#userImage").attr("src", userInfo["foto"]);
    $("#userLogout").click(function(){
        const accept = confirm("¿Desea cerrar sesión?");
        if (accept) window.location.href = "DescubreElMundo.html";
    });

    const consejos = JSON.parse(localStorage.getItem("consejos"));
    $("#tip-form").submit(function(e){
        e.preventDefault();

        const title = $("#tip-title").val().trim();
        const description = $("#tip-text").val().trim();

        if (title.length < 15){
            alert("El título debe de tener 15 carácteres por lo menos");
            return;
        }

        if (description.length < 30){
            alert("La descripción debe de tener 30 carácteres por lo menos");
            return;
        }

        tipList.push({"title": title, "description": description});
        localStorage.setItem("consejos", JSON.stringify(tipList));
        updateTipList(tipList);
    })
});