document.addEventListener("DOMContentLoaded", () => {
    const numero = "56988925516";
    const params = new URLSearchParams(window.location.search);
    const mensaje = params.get("mensaje");

    if (!mensaje || mensaje.trim() === "") {
        alert("¡Ups! No pudimos recuperar tu pedido. Te llevamos de vuelta al formulario para que lo intentes nuevamente 😊");
        window.history.back() || (window.location.href = "index.html");
        return;
    }

    const url = `https://wa.me/${numero}?text=${mensaje}`;

    setTimeout(() => {
        window.location.href = url;
    }, 2000);
});
