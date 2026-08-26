

window.addEventListener("load", () => {

    const stars = document.querySelectorAll('.stars svg');
    const textarea = document.getElementById('comentario');
    const contador = document.getElementById('contador');
    const minCaracteres = document.getElementById('minCaracteres');
    const checkRecomendar = document.getElementById('recomendar');
    const btnEnviar = document.getElementById('btnEnviar');

    const MIN_CARACTERES = 10;
    const MAX_CARACTERES = 500;
    let calificacion = 0;

    // Selección de estrellas
    stars.forEach((star, index) => {

        star.addEventListener('click', () => {

            // quitar selección anterior
            stars.forEach(s => s.classList.remove('active'));

            // marcar estrellas hasta la seleccionada
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('active');
            }

            calificacion = index + 1;
        });

    });

    // Contador de caracteres y validación de mínimo
    textarea.addEventListener('input', () => {
        const longitud = textarea.value.length;
        contador.textContent = `${longitud} / ${MAX_CARACTERES}`;
        minCaracteres.classList.toggle('text-danger', longitud > 0 && longitud < MIN_CARACTERES);
    });

    // Envío de la reseña
    btnEnviar.addEventListener('click', () => {

        if (calificacion === 0) {
            alert('Por favor selecciona una calificación con las estrellas.');
            return;
        }

        const comentario = textarea.value.trim();

        if (comentario.length < MIN_CARACTERES) {
            alert(`Tu comentario debe tener al menos ${MIN_CARACTERES} caracteres.`);
            textarea.focus();
            return;
        }

        const reseña = {
            calificacion,
            comentario,
            recomendar: checkRecomendar.checked,
            fecha: new Date().toISOString()
        };

        console.log('Reseña enviada:', reseña);
        alert('¡Gracias por tu reseña!');

        // Reset del formulario
        stars.forEach(s => s.classList.remove('active'));
        calificacion = 0;
        textarea.value = '';
        contador.textContent = `0 / ${MAX_CARACTERES}`;
        minCaracteres.classList.remove('text-danger');
        checkRecomendar.checked = false;
    });

});
