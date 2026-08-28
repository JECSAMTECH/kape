import { API_BASE_URL } from "./config.js";

// Bloqueo en tiempo real, en el campo nombre no deja escribir números
document.getElementById("nombre").addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
});
// Bloqueo en tiempo real, en el campo teléfono no deja escribir letras y limita a 10 dígitos
document.getElementById("telefono").addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Alerta visual de error utilizando los estilos de Bootstrap
async function ValidarForm(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    console.log(alertPlaceholder);
    const appendAlert = (message) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert" >`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

    // Alerta visual de éxito utilizando los estilos de Bootstrap
    const appendSuccess = (message) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-success alert-dismissible" role="alert" >`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

    // Limpiamos alertas previas para que no se acumulen en cada submit
    alertPlaceholder.innerHTML = '';

    //Definimos las variables de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    // Variable para determinar si el formulario es válido
    let esValido = true;

    /**
     *Validación de campos obligatorios y formato de datos 
     **/

    // Validación de nombre
    if (nombre) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        var nomValido = regex.test(nombre);
        if (nomValido == false) {
            appendAlert('Comprueba que tu nombre no lleve números.')
            esValido = false;
        }
    } else {
        appendAlert('El nombre es obligatorio.')
        esValido = false;
    }

    // Validación de correo electrónico
    if (email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var emailValido = regexEmail.test(email);
        if (emailValido == false) {
            appendAlert('Comprueba que tu correo electrónico sea valido. ejemplo@correo.com')
            esValido = false;
        } else {
            // Verificación del correo en el localStorage (it's no longer used because the source of truth is Spring now)
            /*
            const usuariosExistentes = JSON.parse(localStorage.getItem("usuarios")) || [];
            const correoRepetido = usuariosExistentes.some(
                (usuario) => usuario.email.toLowerCase() === email.toLowerCase()
            );
            
            if (correoRepetido) {
                appendAlert('Correo asociado a una cuenta que ya existe.')
                esValido = false;
            }
            */
        }
    } else {
        appendAlert('El correo electrónico es obligatorio.')
        esValido = false;
    }

    // Validación de teléfono
    if (telefono) {
        const regex = /^[0-9]{10}$/;
        var telValido = regex.test(telefono);
        if (telValido == false) {
            appendAlert('Comprueba que tu teléfono tenga 10 dígitos')
            esValido = false;
        }
    } else {
        appendAlert('El número de teléfono es obligatorio.')
        esValido = false;
    }

    // Validación de contraseña
    if (password) {
        if (password.length < 8) {
            appendAlert('La contraseña debe tener al menos 8 caracteres.')
            esValido = false;
        }
    } else {
        appendAlert('La contraseña es obligatoria.')
        esValido = false;
    }

    // Confirmación de contraseña
    if (confirmPassword) {
        if (confirmPassword !== password) {
            appendAlert('Las contraseñas no coinciden.')
            esValido = false;
        }
    } else {
        appendAlert('Debes confirmar tu contraseña.')
        esValido = false;
    }

    // Validación de aceptación de términos y condiciones    
    if (!terms) {
        appendAlert('Debes aceptar los Términos y Condiciones y la Política de Privacidad.')
        esValido = false;
    }

    // Guardar en localStorage solo si todo es válido (it's no longer valid because we do not store info inside localstorage)

    // The JS object has to mirror the userRequest object from Spring
    if (esValido) {
        const usuarioRequest = {
            nombre: nombre,
            correo: email,
            contrasenia: password,
            confirmarContrasenia: confirmPassword,
            numero: telefono
        }

        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioRequest)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("SUCCESS BLOCK EXECUTED");
            appendSuccess("Cuenta creada correctamente");
            document.getElementById("registroForm").reset();

            setTimeout(() => {
                window.location.href = "inicioSesion.html";
            }, 1500);
        } else {
            console.log("ERROR BLOCK EXECUTED");
            console.log(data.message);
            appendAlert(data.message);
        }
    }

}

document.getElementById("registroForm").addEventListener("submit", ValidarForm);
