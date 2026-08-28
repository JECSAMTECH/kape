// ======================================================
// CONFIGURACIÓN CENTRALIZADA DE LA API (KÁPE)
// ======================================================

const esLocal = window.location.hostname === "localhost" || 
                window.location.hostname === "127.0.0.1" || 
                window.location.hostname === "";

// URL pública del backend de Spring Boot (Cámbiala al desplegar en AWS / EC2 / Render)
const AWS_PROD_URL = "http://localhost:8080/api"; 

export const API_BASE_URL = esLocal 
    ? "http://localhost:8080/api" 
    : AWS_PROD_URL;

if (typeof window !== "undefined") {
    window.API_BASE_URL = API_BASE_URL;
}
