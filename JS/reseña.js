

window.addEventListener("load", () => {

    const stars = document.querySelectorAll('.stars svg');

    stars.forEach((star, index) => {

        star.addEventListener('click', () => {

            // quitar selección anterior
            stars.forEach(s => s.classList.remove('active'));

            // marcar estrellas hasta la seleccionada
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('active');
            }

            console.log("Calificación:", index + 1);
        });

    });

});