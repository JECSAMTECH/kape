
import { API_BASE_URL } from "./config.js";

// Obtener ID del producto desde la URL actual
const parametrosUrl = new URLSearchParams(window.location.search);
const idCafe = Number(parametrosUrl.get("id")) || 1;

// Función para generar estrellas HTML según la calificación
function generarEstrellas(calificacion) {
    let estrellas = "";
    const estrellasCompletas = Math.floor(calificacion);
    const tieneMediaEstrella = calificacion % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= estrellasCompletas) {
            estrellas += '<i class="bi bi-star-fill text-warning"></i>';
        } else if (i === estrellasCompletas + 1 && tieneMediaEstrella) {
            estrellas += '<i class="bi bi-star-half text-warning"></i>';
        } else {
            estrellas += '<i class="bi bi-star text-muted"></i>';
        }
    }
    return estrellas;
}

// Función para calcular promedio de calificaciones
function calcularPromedio(resenias) {
    if (!resenias || resenias.length === 0) return 0;
    const suma = resenias.reduce((acc, r) => acc + (Number(r.calificacion) || 0), 0);
    return suma / resenias.length;
}

// Calcular distribución de estrellas
function calcularDistribucion(resenias) {
    const conteo = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    if (!resenias) return conteo;
    resenias.forEach(r => {
        const estrella = Math.min(5, Math.max(1, Math.round(Number(r.calificacion) || 5)));
        conteo[estrella] = (conteo[estrella] || 0) + 1;
    });
    return conteo;
}

// Actualizar barras y porcentajes de distribución
function actualizarDistribucion(resenias) {
    const total = resenias.length;
    const distribucion = calcularDistribucion(resenias);

    for (let estrellas = 1; estrellas <= 5; estrellas++) {
        let porcentaje = total > 0 ? Math.round((distribucion[estrellas] / total) * 100) : 0;
        const barra = document.querySelector(`#barra-${estrellas}`);
        const textoPorcentaje = document.querySelector(`#porcentaje-${estrellas}`);

        if (barra) {
            barra.style.width = `${porcentaje}%`;
            barra.setAttribute("aria-valuenow", porcentaje);
        }
        if (textoPorcentaje) {
            textoPorcentaje.textContent = `${porcentaje}%`;
        }
    }
}

// Actualizar el resumen visual de opiniones
function actualizarResumenOpiniones(resenias) {
    const promedio = calcularPromedio(resenias);
    const total = resenias ? resenias.length : 0;

    const promedioEstrellas = document.querySelector("#promedio-estrellas");
    const promedioCalificacion = document.querySelector("#promedio-calificacion");
    const totalCalificaciones = document.querySelector("#total-calificaciones");

    if (promedioEstrellas) {
        promedioEstrellas.innerHTML = total > 0 ? generarEstrellas(promedio) : '<span class="text-muted">Sin valoraciones</span>';
    }
    if (promedioCalificacion) {
        promedioCalificacion.textContent = total > 0 ? `${promedio.toFixed(1)} de 5` : "0.0 de 5";
    }
    if (totalCalificaciones) {
        totalCalificaciones.textContent = total;
    }

    // Actualizar también la parte superior del producto junto al precio
    const headerEstrellas = document.querySelector(".producto-estrellas");
    const headerResenas = document.querySelector(".producto-resenas");
    if (headerEstrellas && total > 0) {
        headerEstrellas.innerHTML = generarEstrellas(promedio);
    }
    if (headerResenas) {
        headerResenas.textContent = `(${total} ${total === 1 ? 'reseña' : 'reseñas'})`;
    }

    actualizarDistribucion(resenias);
}

// Formatear fecha
function formatearFecha(fechaStr) {
    if (!fechaStr) return "Reciente";
    try {
        const fecha = new Date(fechaStr);
        if (isNaN(fecha.getTime())) return fechaStr;
        return fecha.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    } catch {
        return fechaStr;
    }
}

// Renderizar lista de reseñas en el contenedor
function mostrarResenias(resenias) {
    const listaComentarios = document.querySelector("#lista-comentarios");
    if (!listaComentarios) return;

    listaComentarios.innerHTML = "";

    if (!resenias || resenias.length === 0) {
        listaComentarios.innerHTML = `
            <div class="card border-0 bg-light p-4 text-center text-muted rounded-4">
                <i class="bi bi-chat-square-text fs-2 mb-2"></i>
                <p class="mb-1 fw-bold">Aún no hay reseñas para este café.</p>
                <small>¡Sé el primero en probarlo y compartir tu experiencia!</small>
            </div>
        `;
        return;
    }

    resenias.forEach((resenia, index) => {
        const usuarioNombre = resenia.nombreUsuario || resenia.usuario || `Cliente Kápe #${resenia.idUsuario || (index + 1)}`;
        const calif = Number(resenia.calificacion) || 5;
        const comentario = resenia.comentario || "Excelente calidad y aroma.";
        const fechaFormateada = formatearFecha(resenia.fecha);

        listaComentarios.insertAdjacentHTML(
            "beforeend",
            `
            <article class="card border rounded-4 p-4 shadow-sm">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <div class="avatar-review rounded-circle d-flex align-items-center justify-content-center bg-light text-primary">
                        <i class="bi bi-person-fill"></i>
                    </div>
                    <span class="nombre-usuario fw-bold">
                        ${usuarioNombre}
                    </span>
                </div>
                <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                    <span class="estrellas-resenia">
                        ${generarEstrellas(calif)}
                    </span>
                </div>
                <p class="fecha-resenia text-muted small mb-2">
                    ${fechaFormateada}
                </p>
                <p class="comentario-resenia mb-0">
                    ${comentario}
                </p>
            </article>
            `
        );
    });
}

// Cargar reseñas desde la API
async function cargarResenias() {
    try {
        const response = await fetch(`${API_BASE_URL}/resenias/cafe/${idCafe}`);
        if (response.ok) {
            const data = await response.json();
            mostrarResenias(data);
            actualizarResumenOpiniones(data);
        } else {
            console.warn(`No se pudieron obtener las reseñas del backend (Status ${response.status}).`);
            mostrarResenias([]);
            actualizarResumenOpiniones([]);
        }
    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        mostrarResenias([]);
        actualizarResumenOpiniones([]);
    }
}

document.addEventListener("DOMContentLoaded", cargarResenias);