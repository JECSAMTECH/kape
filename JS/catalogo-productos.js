let cafes = [];

async function obtenerCafes() {
    try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        cafes = await response.json();
        mostrarCafes(cafes);
    } catch (error) {
        console.error("Error al cargar los cafés:", error);
    }
}


// mostrar productos
function mostrarCafes(listaCafes) {
    const contenedor = document.getElementById("catalogo-productos");
    contenedor.innerHTML = "";
    listaCafes.forEach(cafe => {
        const tarjeta = `
            <div class="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch">
                <div class="card card-producto border-0 shadow-sm w-100 position-relative">
                    <img 
                        src="${cafe.imagenCafe}" 
                        class="card-img-top" 
                        alt="${cafe.nombreCafe}"
                    >
                    <span
                        class="position-absolute top-0 start-0 m-3 px-2 py-1 rounded text-uppercase font-monospace"
                        style="
                            background-color: #8C4327;
                            color: #F5EBE6;
                            font-size: 0.65rem;
                            letter-spacing: 1px;
                            font-weight: bold;
                        "
                    >
                        ${cafe.etiquetasCafe}
                    </span>
                    <div class="card-body d-flex flex-column justify-content-between text-start">
                        <div>
                            <h5 class="card-title fw-bold text-center mb-2">
                                ${cafe.nombreCafe}
                            </h5>
                            <p class="card-text text-muted text-center small mb-3">
                                ${cafe.notasCataCafe}
                            </p>
                        </div>
                        <div class="d-flex justify-content-around text-muted small mb-3 py-2">
                            <span>
                                <i class="bi bi-fire me-1"></i>
                                ${cafe.tuesteCafe.toUpperCase()}
                            </span>
                            <span>
                                Intensidad ${cafe.intensidadCafe}/5
                            </span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="fs-5 fw-bold text-dark">
                                $${cafe.precioCafe}
                            </span>
                            <button 
                                onclick="verDetalles(${cafe.idCafe})"
                                class="btn btn-agregar"
                            >
                                Ver detalle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
}


// filtro orden de precio cafés
document.addEventListener("DOMContentLoaded", async () => {
    await obtenerCafes();
    const selectOrden = document.getElementById("ordenar-precio");
    selectOrden.addEventListener("change", () => {
        const opcionSeleccionada = selectOrden.value;
        let cafesOrdenados = [...cafes];
        if (opcionSeleccionada === "mayor-menor") {
            cafesOrdenados.sort(
                (a, b) => b.precioCafe - a.precioCafe
            );

        } else if (opcionSeleccionada === "menor-mayor") {
            cafesOrdenados.sort(
                (a, b) => a.precioCafe - b.precioCafe
            );
        }

        mostrarCafes(cafesOrdenados);
    });
});


function verDetalles(idCafe) {
    window.location.href = `producto.html?id=${idCafe}`;
}