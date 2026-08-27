export function iniciarNavbar() {
    const modalNavbar = document.getElementById('modal-navbar');
    const inputNavbarSearch = document.getElementById('input-navbar-search');

    if (modalNavbar && inputNavbarSearch) {
        modalNavbar.addEventListener('shown.bs.modal', () => {
            inputNavbarSearch.focus();
        });
    }

    // Marca el link activo según la URL actual
    const currentPath = window.location.pathname.replace(/\/$/, "").split("/").pop() || "index.html";

    document.querySelectorAll(".navbar-nav .nav-item").forEach(item => {
        item.classList.remove("active");
    });

    document.querySelectorAll(".navbar-nav .nav-item a").forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();
        if (linkPath === currentPath) {
            link.closest(".nav-item")?.classList.add("active");
        }
    });

    actualizarAccesoCuenta();
}

function actualizarAccesoCuenta() {
    const enlaceEscritorio = document.getElementById("account-link");
    const enlaceMovil = document.getElementById("account-link-mobile");
    const botonCuenta = document.getElementById("account-button");
    const menuCuenta = document.getElementById("account-menu");
    const botonCerrarSesion = document.getElementById("logout-button");
    const itemCerrarSesionMovil = document.getElementById("logout-mobile-item");
    const botonCerrarSesionMovil = document.getElementById("logout-mobile-button");
    let sesion;

    try {
        sesion = JSON.parse(localStorage.getItem("kapeSesion"));
    } catch {
        localStorage.removeItem("kapeSesion");
    }

    const esAdmin = sesion?.rol?.toLowerCase() === "admin";
    const destino = sesion
        ? (esAdmin ? "/HTML/perfilAdmin.html" : "/HTML/perfil.html")
        : "/HTML/inicioSesion.html";
    const etiqueta = sesion
        ? (esAdmin ? "Panel de administración" : "Mi perfil")
        : "Iniciar sesión";

    if (enlaceEscritorio) {
        enlaceEscritorio.href = destino;
        enlaceEscritorio.textContent = etiqueta;
    }

    if (botonCuenta) {
        botonCuenta.setAttribute("aria-label", etiqueta);
        botonCuenta.title = etiqueta;
        botonCuenta.classList.toggle("navbar-btn-admin", esAdmin);
    }

    if (menuCuenta) {
        // El menú siempre inicia cerrado; sólo se abre al pulsar el icono.
        menuCuenta.hidden = true;
    }

    if (itemCerrarSesionMovil) {
        itemCerrarSesionMovil.hidden = !sesion;
    }

    if (enlaceMovil) {
        enlaceMovil.href = destino;
        enlaceMovil.textContent = etiqueta;
    }

    const cerrarSesion = () => {
        localStorage.removeItem("kapeSesion");
        window.location.href = "/index.html";
    };

    botonCerrarSesion?.addEventListener("click", cerrarSesion);
    botonCerrarSesionMovil?.addEventListener("click", cerrarSesion);

    document.addEventListener("click", (evento) => {
        const targetBtnCuenta = evento.target.closest("#account-button");
        const menuCuentaElem = document.getElementById("account-menu");

        if (targetBtnCuenta) {
            evento.preventDefault();
            if (!sesion) {
                window.location.href = destino;
                return;
            }
            if (menuCuentaElem) {
                const estaAbierto = !menuCuentaElem.hidden;
                menuCuentaElem.hidden = estaAbierto;
                targetBtnCuenta.setAttribute("aria-expanded", String(!estaAbierto));
            }
            return;
        }

        if (sesion && menuCuentaElem && !evento.target.closest("#account-menu-container")) {
            menuCuentaElem.hidden = true;
            document.getElementById("account-button")?.setAttribute("aria-expanded", "false");
        }
    });
}



