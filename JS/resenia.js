import { API_BASE_URL, normalizarRutaImagen } from "./config.js";

async function cargarProductoResenia() {
    const params = new URLSearchParams(window.location.search);
    const idCafe = params.get("id") || params.get("idCafe");
    const numPedido = params.get("pedido") || params.get("num");

    if (numPedido) {
        const pedElem = document.getElementById("resenia-pedido-num");
        if (pedElem) pedElem.textContent = `RESEÑA DEL PEDIDO #${numPedido}`;
    }

    if (!idCafe) {
        // Cargar por defecto el primer café del catálogo si no se especificó ID
        try {
            const res = await fetch(`${API_BASE_URL}/products`);
            if (res.ok) {
                const cafes = await res.json();
                if (Array.isArray(cafes) && cafes.length > 0) {
                    mostrarInfoCafe(cafes[0]);
                }
            }
        } catch (_) { }
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/products/${idCafe}`);
        if (res.ok) {
            const cafe = await res.json();
            mostrarInfoCafe(cafe);
        }
    } catch (e) {
        console.warn("No se pudo cargar el café para la reseña:", e);
    }
}

function mostrarInfoCafe(cafe) {
    if (!cafe) return;
    const imgElem = document.getElementById("resenia-producto-img");
    const nombreElem = document.getElementById("resenia-producto-nombre");
    const tuesteElem = document.getElementById("resenia-producto-tueste");

    if (imgElem) {
        imgElem.src = normalizarRutaImagen(cafe.imagenCafe);
        imgElem.alt = cafe.nombreCafe || "Café";
    }
    if (nombreElem && cafe.nombreCafe) {
        nombreElem.textContent = cafe.nombreCafe;
    }
    if (tuesteElem) {
        const tueste = cafe.tuesteCafe || "Tueste Medio";
        const notas = cafe.notasCataCafe ? ` • ${cafe.notasCataCafe}` : "";
        tuesteElem.textContent = `${tueste}${notas}`;
    }
}

function initResenia() {
    cargarProductoResenia();

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
    textarea?.addEventListener('input', () => {
        const longitud = textarea.value.length;
        if (contador) contador.textContent = `${longitud} / ${MAX_CARACTERES}`;
        if (minCaracteres) minCaracteres.classList.toggle('text-danger', longitud > 0 && longitud < MIN_CARACTERES);
    });

    // Envío de la reseña
    btnEnviar?.addEventListener('click', async () => {
        if (calificacion === 0) {
            alert('Por favor selecciona una calificación con las estrellas.');
            return;
        }

        const comentario = textarea?.value.trim() || "";

        if (comentario.length < MIN_CARACTERES) {
            alert(`Tu comentario debe tener al menos ${MIN_CARACTERES} caracteres.`);
            textarea?.focus();
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const detalleId = Number(params.get("detalleId")) || 1;

        const reseniaDto = {
            calificacion,
            comentario,
            idDetallePedido: detalleId
        };

        try {
            const response = await fetch(`${API_BASE_URL}/resenias`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reseniaDto)
            });

            if (response.ok) {
                alert('¡Gracias por tu reseña! Se ha guardado correctamente.');
            } else {
                alert('¡Gracias por tu reseña!');
            }
        } catch (e) {
            console.warn("Backend no disponible:", e.message);
            alert('¡Gracias por tu reseña!');
        }

        // Reset del formulario
        stars.forEach(s => s.classList.remove('active'));
        calificacion = 0;
        if (textarea) textarea.value = '';
        if (contador) contador.textContent = `0 / ${MAX_CARACTERES}`;
        if (minCaracteres) minCaracteres.classList.remove('text-danger');
        if (checkRecomendar) checkRecomendar.checked = false;
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initResenia);
} else {
    initResenia();
}
