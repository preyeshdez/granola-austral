document.addEventListener("DOMContentLoaded", () => {
    const numero = "56988925516";
    const mensaje = localStorage.getItem("mensajeWhatsapp") || "";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    setTimeout(() => {
        window.location.href = url;
    }, 5000);
});  