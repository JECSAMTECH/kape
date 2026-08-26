const paginaActual = window.location.pathname.split("/").pop();
let sesion;

try {
    sesion = JSON.parse(localStorage.getItem("kapeSesion"));
} catch {
    localStorage.removeItem("kapeSesion");
}

const esAdmin = sesion?.rol?.toLowerCase() === "admin";

if (!sesion) {
    window.location.replace("./inicioSesion.html");
} else if (paginaActual === "perfilAdmin.html" && !esAdmin) {
    window.location.replace("./perfil.html");
} else if (paginaActual === "perfil.html" && esAdmin) {
    window.location.replace("./perfilAdmin.html");
}
