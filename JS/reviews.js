
const resenias = [
    {
        id: 1,
        usuario: "Mariana López",
        calificacion: 5,
        titulo: "Excelente café para empezar el día",
        comentario: "Tiene un aroma intenso y un sabor muy agradable. Lo preparo en cafetera italiana y queda excelente.",
        fecha: "2026-08-20",
    },
    {
        id: 2,
        usuario: "Carlos Hernández",
        calificacion: 4.5,
        titulo: "Muy buen sabor y aroma",
        comentario: "Me gustó bastante el balance entre acidez y dulzor. Definitivamente volvería a comprarlo.",
        fecha: "2026-08-18",
    },
    {
        id: 3,
        usuario: "Fernanda Ramírez",
        calificacion: 4,
        titulo: "Buen café para prensa francesa",
        comentario: "Lo probé en prensa francesa y tiene buen cuerpo. El aroma es muy agradable al abrir la bolsa.",
        fecha: "2026-08-15",
    },
    {
        id: 4,
        usuario: "Diego Martínez",
        calificacion: 3.5,
        titulo: "Bueno, aunque esperaba más intensidad",
        comentario: "El café está rico y tiene buen aroma, pero para mi gusto podría tener un sabor un poco más intenso.",
        fecha: "2026-08-10",
    },
    {
        id: 5,
        usuario: "Andrea Sánchez",
        calificacion: 5,
        titulo: "Se convirtió en mi café favorito",
        comentario: "Muy aromático, con buen cuerpo y nada amargo. Lo he preparado tanto en V60 como en cafetera y funciona muy bien.",
        fecha: "2026-08-05",
    }
];

// función para estrellas 

function generarEstrellas(calificacion) {
    let estrellas = "";
    const estrellasCompletas = Math.floor(calificacion);
    const tieneMediaEstrella = calificacion % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= estrellasCompletas) {
            estrellas += '<i class="bi bi-star-fill"></i>';
        }
        else if (i === estrellasCompletas + 1 && tieneMediaEstrella) {
            estrellas += '<i class="bi bi-star-half"></i>';
        }
        else {
            estrellas += '<i class="bi bi-star"></i>';
        }
    }
    return estrellas;
}


// función calcular promedio reseñas
function calcularPromedio(resenias) {
    if (resenias.length === 0) {
        return 0;
    }
    const sumaCalificaciones = resenias.reduce(
        (acumulador, resenia) =>
            acumulador + resenia.calificacion,
        0//??
    );
    return sumaCalificaciones / resenias.length;
}

// calcular porcentaje estrellas 
function calcularDistribucion(resenias) {
    const conteo = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    };
    resenias.forEach(resenia => {
        const grupo = Math.round(resenia.calificacion);
        conteo[grupo]++;
    });
    return conteo;
}

// actualizar datos reseñas
function actualizarDistribucion(resenias) {
    const distribucion = calcularDistribucion(resenias);
    const total = resenias.length;

    for (let estrellas = 1; estrellas <= 5; estrellas++) {
        let porcentaje = 0;
        if (total > 0) {
            porcentaje = Math.round(
                (distribucion[estrellas] / total) * 100
            );
        }
        const barra = document.querySelector(`#barra-${estrellas}`);
        const textoPorcentaje = document.querySelector(`#porcentaje-${estrellas}`);
        
        barra.style.width = `${porcentaje}%`;
        barra.setAttribute(
            "aria-valuenow",
            porcentaje
        );

        textoPorcentaje.textContent =
            `${porcentaje}%`;
    }
}


function actualizarResumenOpiniones(resenias) {
    const promedio = calcularPromedio(resenias);
    const promedioEstrellas = document.querySelector("#promedio-estrellas");
    const promedioCalificacion = document.querySelector("#promedio-calificacion");
    const totalCalificaciones = document.querySelector("#total-calificaciones");
    
    promedioEstrellas.innerHTML = generarEstrellas(promedio);
    promedioCalificacion.textContent =
        `${promedio.toFixed(1)} de 5`;

    totalCalificaciones.textContent =
        resenias.length;

    actualizarDistribucion(resenias);
}

// función formato fecha para reseña
function formatearFecha(fecha) {
    const fechaObjeto = new Date(`${fecha}T00:00:00`);

    return fechaObjeto.toLocaleDateString(
        "es-MX",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}

// mostrar reseña
function mostrarResenias(resenias) {
    const listaComentarios = document.querySelector("#lista-comentarios");

    listaComentarios.innerHTML = "";

    resenias.forEach(resenia => {
        listaComentarios.insertAdjacentHTML(
            "beforeend",
            `
            <article class="card border rounded-4 p-4 shadow-sm">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <div class="avatar-review rounded-circle
                                d-flex align-items-center
                                justify-content-center">

                        <i class="bi bi-person-fill"></i>
                    </div>
                    <span class="nombre-usuario">
                        ${resenia.usuario}
                    </span>
                </div>
                <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                    <span class="estrellas-resenia">
                        ${generarEstrellas(resenia.calificacion)}
                    </span>
                    <h2 class="titulo-resenia mb-0">
                        ${resenia.titulo}
                    </h2>
                </div>
                <p class="fecha-resenia mb-0">
                    ${formatearFecha(resenia.fecha)}
                </p>
                <p class="comentario-resenia mb-0">
                    ${resenia.comentario}
                </p>
            </article>
            `
        );
    });
}

// cargar en el front
document.addEventListener(
    "DOMContentLoaded",
    () => {
        mostrarResenias(resenias);
        actualizarResumenOpiniones(resenias);
    }
);