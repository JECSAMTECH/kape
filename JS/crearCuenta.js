// Bloqueo en tiempo real, en el campo nombre no deja escribir números
document.getElementById("nombre").addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });
// Bloqueo en tiempo real, en el campo teléfono no deja escribir letras y limita a 10 dígitos
document.getElementById("telefono").addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Alerta visual de error utilizando los estilos de Bootstrap
function ValidarForm() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
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

    return esValido;

// Guardar en localStorage solo si todo es válido
    if (esValido) {
        const usuario = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            fechaRegistro: new Date().toISOString()
            // No incluir password aquí ya que es un dato sensible
        };

 // Traer la lista existente, o crear una vacía si no hay nada
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

}
}