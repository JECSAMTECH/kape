import { iniciarNavbar } from "./navbar.js";
import { iniciarCarrito } from "./carrito.js";

const estaEnHtml = window.location.pathname.includes("/HTML/");
const rutaComponentes = estaEnHtml ? "." : "./HTML";
const rutaEstilos = estaEnHtml ? "../CSS" : "./CSS";

function cargarBootstrap() {
    if (window.bootstrap) return Promise.resolve();

    const existente = document.getElementById("bootstrap-component-js");
    if (existente) {
        return new Promise((resolve, reject) => {
            existente.addEventListener("load", resolve, { once: true });
            existente.addEventListener("error", reject, { once: true });
        });
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.id = "bootstrap-component-js";
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js";
        script.addEventListener("load", resolve, { once: true });
        script.addEventListener("error", () => reject(new Error("No se pudo cargar Bootstrap.")), { once: true });
        document.head.append(script);
    });
}

function cargarEstilo(id, archivo) {
    if (document.getElementById(id)) return;

    const enlace = document.createElement("link");
    enlace.id = id;
    enlace.rel = "stylesheet";
    enlace.href = `${rutaEstilos}/${archivo}`;
    enlace.addEventListener("error", () => {
        console.error(`No se pudo cargar el estilo ${archivo}.`);
    }, { once: true });
    document.head.append(enlace);
}

function cargarEstiloExterno(id, url) {
    if (document.getElementById(id)) return;

    const enlace = document.createElement("link");
    enlace.id = id;
    enlace.rel = "stylesheet";
    enlace.href = url;
    document.head.append(enlace);
}

async function cargarComponente(contenedorId, archivo, estiloId, estilo) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return false;

    cargarEstilo(estiloId, estilo);

    const respuesta = await fetch(`${rutaComponentes}/${archivo}`);
    if (!respuesta.ok) throw new Error(`No se pudo cargar ${archivo}.`);

    contenedor.innerHTML = await respuesta.text();
    return true;
}

async function cargarNavbar() {
    const cargado = await cargarComponente(
        "navbarInject", "navbar.html", "navbar-component-css", "navbar.css"
    );
    if (!cargado) return;

    // Los botones sólo se enlazan después de insertar el navbar en el DOM.
    iniciarNavbar();
    iniciarCarrito();

    // Bootstrap mejora los componentes visuales, pero no debe impedir que los
    // botones del navbar y el carrito queden activos si el CDN tarda o falla.
    cargarBootstrap().catch(error => console.error(error));
}

function cargarFooter() {
    cargarEstiloExterno(
        "bootstrap-icons-component-css",
        "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    );

    return cargarComponente(
        "footerInject", "footer.html", "footer-component-css", "footer.css"
    );
}

Promise.all([cargarNavbar(), cargarFooter()])
    .catch(error => console.error("Error al cargar los componentes compartidos:", error));
