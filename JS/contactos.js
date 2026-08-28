import { API_BASE_URL } from "./config.js";

async function ValidarForm(event) {
    if (event) {
        event.preventDefault();
    }

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    alertPlaceholder.innerHTML = '';

    const appendAlert = (message, type = 'danger') => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');

        alertPlaceholder.append(wrapper);
    };

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    let esValido = true;

    if (nombre) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(nombre)) {
            appendAlert('Comprueba que tu nombre no lleve números.');
            esValido = false;
        }
    }

    if (!email) {
        appendAlert('El correo electrónico es obligatorio.');
        esValido = false;
    } else {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            appendAlert('Comprueba que tu correo sea válido. ejemplo@correo.com');
            esValido = false;
        }
    }

    if (telefono) {
        const regex = /^[0-9]{10}$/;
        if (!regex.test(telefono)) {
            appendAlert('Comprueba que tu teléfono tenga 10 dígitos.');
            esValido = false;
        }
    }

    if (!asunto) {
        appendAlert('Debes seleccionar un asunto.');
        esValido = false;
    }

    if (!mensaje) {
        appendAlert('El mensaje es obligatorio.');
        esValido = false;
    }

    if (!esValido) {
        return;
    }

    let sesion = null;
    try {
        sesion = JSON.parse(localStorage.getItem("kapeSesion"));
    } catch (e) { }

    const usuarioId = (sesion && sesion.idUsuario) ? sesion.idUsuario : 1;

    const contactoRequest = {
        nombre: nombre || "Anónimo",
        correo: email,
        telefono: telefono || "",
        asunto: asunto,
        mensaje: mensaje,
        usuarioId: usuarioId
    };

    try {
        const response = await fetch(`${API_BASE_URL}/contacto`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactoRequest)
        });

        if (response.ok) {
            appendAlert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            document.querySelector("form").reset();
        } else {
            const errData = await response.json().catch(() => ({}));
            appendAlert(errData.message || 'Ocurrió un error al enviar el mensaje. Intenta más tarde.');
        }
    } catch (error) {
        console.error("Error al enviar mensaje de contacto:", error);
        appendAlert('No se pudo conectar con el servidor. Intenta de nuevo.');
    }
}

window.ValidarForm = ValidarForm;
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", ValidarForm);
    }
});