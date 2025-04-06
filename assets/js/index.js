function enviarPedido() {
    const cantidad = document.getElementById('cantidad').value;
    const endulzante = document.querySelector('input[name="endulzante"]:checked')?.value;

    const ingredientes = [];
    document.querySelectorAll('input[name="ingredientes"]:checked').forEach(el => {
        ingredientes.push(el.value);
    });

    if (!endulzante) {
        alert("Por favor selecciona un tipo de endulzante.");
        return;
    }

    if (ingredientes.length === 0 || ingredientes.length > 6) {
        alert("Debes seleccionar entre 1 y 6 ingredientes.");
        return;
    }

    let mensaje = `Hola!\n`;
    mensaje += `Quiero pedir una granola de ${cantidad} \n\n*Endulzante:*\n➤ ${endulzante}\n`;
    mensaje += `\n*Ingredientes:*\n`;
    ingredientes.forEach(ing => {
        mensaje += `➤ ${ing}\n`;
    });

    const numero = "56988925516";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');

    window.location.href = "pedido-realizado.html";
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

