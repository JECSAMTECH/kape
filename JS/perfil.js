let sesion;
try {
    sesion = JSON.parse(localStorage.getItem("kapeSesion"));
} catch {
    localStorage.removeItem("kapeSesion");
}

if (sesion && sesion.nombre) {
    const nombreElement = document.getElementById('nombreUsuario');
    if (nombreElement) {
        nombreElement.textContent = sesion.nombre;
    }
}

const cerrarSesionBtn = document.querySelector('.cerrar-sesion');
if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener('click', function(evento) {
        evento.preventDefault();
        localStorage.removeItem('kapeSesion');
        window.location.href = '/index.html';
    });
}