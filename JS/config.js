// ======================================================
// CONFIGURACIÓN CENTRALIZADA DE LA API (KÁPE)
// ======================================================

const esLocal = window.location.hostname === "localhost" || 
                window.location.hostname === "127.0.0.1" || 
                window.location.hostname === "";

// URL pública del backend de Spring Boot — NGINX hace proxy del puerto 80 → 8080
const AWS_PROD_URL = "http://3.15.187.154/api";

export const API_BASE_URL = esLocal 
    ? "http://localhost:8080/api" 
    : AWS_PROD_URL;

if (typeof window !== "undefined") {
    window.API_BASE_URL = API_BASE_URL;
}

// Normaliza las rutas de imágenes almacenadas en la base de datos
export function normalizarRutaImagen(ruta) {
    if (!ruta || typeof ruta !== "string") {
        return "/assets/images/catalogo/01.png";
    }
    const r = ruta.trim();
    if (r.startsWith("http://") || r.startsWith("https://") || r.startsWith("data:")) {
        return r;
    }
    if (r.startsWith("/assets/")) {
        return r;
    }
    if (r.startsWith("./assets/")) {
        return `/${r.substring(2)}`;
    }
    if (r.startsWith("../assets/")) {
        return `/${r.substring(3)}`;
    }
    if (r.startsWith("assets/")) {
        return `/${r}`;
    }
    if (!r.includes("/")) {
        return `/assets/images/catalogo/${r}`;
    }
    return r.startsWith("/") ? r : `/${r}`;
}
