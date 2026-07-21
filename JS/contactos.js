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


    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value;

    console.log(nombre);

    
    if (nombre) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        var nomValido = regex.test(nombre);
        if (nomValido == false) {
            appendAlert('Comprueba que tu nombre no lleve números.')
        }
    }

    if(email){
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var emailValido = regexEmail.test(email);
        if (emailValido == false) {
            appendAlert('Comprueba que tu nombre correo sea valido. ejemplo@correo.com')
        }
    }
    
    if (telefono) {
        const regex = /^[0-9]{10}$/;
        var telValido = regex.test(telefono);
        if (telValido == false) {
            appendAlert('Comprueba que tu teléfono tenga 10 dígitos')
        }
    }


    

}