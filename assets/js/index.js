function enviarPedido() {
    const cantidad = document.getElementById('cantidad').value;
    const endulzante = document.querySelector('input[name="endulzante"]:checked')?.value;
    const nombre = document.getElementById('nombre').value;

    const ingredientes = [];
    document.querySelectorAll('input[name="ingredientes"]:checked').forEach(sel => {
        ingredientes.push(sel.value);
    });

    if (!nombre) {
        alert("Por favor ingresa tu nombre.")
        return;
    }

    if (!endulzante) {
        alert("Por favor selecciona un tipo de endulzante.");
        return;
    }

    if (ingredientes.length === 0 || ingredientes.length > 6) {
        alert("Debes seleccionar entre 1 y 6 ingredientes.");
        return;
    }

    let mensaje = `Hola!%0D%0A`;
    mensaje += `Quiero pedir una granola de ${cantidad} %0D%0A%0D%0A`;
    mensaje += `*Nombre cliente:*%0D%0A`;
    mensaje += `➤ ${nombre}%0D%0A%0D%0A`;
    mensaje += `*Endulzante:*%0D%0A➤ ${endulzante}%0D%0A%0D%0A`;
    mensaje += `*Ingredientes:*%0D%0A`;
    ingredientes.forEach(ing => {
        mensaje += `➤ ${ing}%0D%0A`;
    });

    const mensajeEncoded = encodeURIComponent(mensaje);
    window.location.href = `pedido-realizado.html?mensaje=${mensajeEncoded}`;

}

function limitarIngredientes() {
    const checkboxes = document.querySelectorAll('input[name="ingredientes"]');
    const seleccionados = Array.from(checkboxes).filter(cb => cb.checked);

    checkboxes.forEach(cb => {
        if (!cb.checked) {
            cb.disabled = seleccionados.length >= 6;
        }
    });

    const contador = document.getElementById('contadorIngredientes');
    contador.textContent = `${seleccionados.length} de 6`;
}


document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('input[name="ingredientes"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', limitarIngredientes);
    });
});

