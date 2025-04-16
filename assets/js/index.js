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

    if (!cantidad) {
        alert("Por favor selecciona la cantidad.");
        return;
    }

    if (ingredientes.length < 3 || ingredientes.length > 6) {
        alert("Debes seleccionar entre 3 y 6 ingredientes.");
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

document.addEventListener("DOMContentLoaded", () => {
    const cantidadSelect = document.getElementById("cantidad");
    const endulzantes = document.querySelectorAll('input[name="endulzante"]');

    const opcionesPorEndulzante = {
        miel: [
            { text: "350g - $4.500", value: "350g - $4.500" },
            { text: "700g - $8.500", value: "700g - $8.500" },
            { text: "1kg - $12.000", value: "1kg - $12.000" }
        ],
        alulosa: [
            { text: "350g - $5.000", value: "350g - $5.000" },
            { text: "700g - $9.300", value: "700g - $9.300" },
            { text: "1kg - $13.000", value: "1kg - $13.000" }
        ]
    };

    function actualizarOpciones(endulzante) {
        cantidadSelect.innerHTML = '<option value="">Selecciona una opción</option>';
        const key = endulzante.toLowerCase();

        if (opcionesPorEndulzante[key]) {
            opcionesPorEndulzante[key].forEach(op => {
                const option = document.createElement("option");
                option.value = op.value;
                option.textContent = op.text;
                cantidadSelect.appendChild(option);
            });
            cantidadSelect.disabled = false;
        }
    }

    endulzantes.forEach(radio => {
        radio.addEventListener("change", (e) => {
            actualizarOpciones(e.target.value);
        });
    });
});