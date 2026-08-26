const cafes = [
    {
        nombre: "Montaña de Oro",
        descripcion: "Café de cuerpo intenso y aroma dulce.",
        imagen: "../assets/images/catalogo/01.png",
        etiquetas: ["Colombia", "Huila"],
        tueste: "Medio",
        notasCata: ["Caramelo", "Chocolate amargo", "Frutos rojos"],
        intensidad: 4,
        precio: 250,
        stock: 15
    },
    {
        nombre: "Brisa Descafeinada",
        descripcion: "Café suave y equilibrado, perfecto para cualquier hora.",
        imagen: "../assets/images/catalogo/02.png",
        etiquetas: ["Descafeinado"],
        tueste: "Medio",
        notasCata: ["Caramelo", "Almendra", "Cacao"],
        intensidad: 2,
        precio: 220,
        stock: 10
    },
    {
        nombre: "Noche de Chiapas",
        descripcion: "Café profundo con notas dulces y especiadas.",
        imagen: "../assets/images/catalogo/03.png",
        etiquetas: ["México", "Chiapas"],
        tueste: "Oscuro",
        notasCata: ["Chocolate", "Canela", "Nuez"],
        intensidad: 5,
        precio: 280,
        stock: 8
    },
    {
        nombre: "Veracruz Reserva",
        descripcion: "Café aromático con acidez equilibrada.",
        imagen: "../assets/images/catalogo/04.png",
        etiquetas: ["México", "Veracruz"],
        tueste: "Medio",
        notasCata: ["Cítricos", "Chocolate", "Miel"],
        intensidad: 3,
        precio: 240,
        stock: 20
    },
    {
        nombre: "Sierra Dulce",
        descripcion: "Café dulce y ligero con notas frutales.",
        imagen: "../assets/images/catalogo/03.png",
        etiquetas: ["México", "Oaxaca"],
        tueste: "Claro",
        notasCata: ["Durazno", "Miel", "Vainilla"],
        intensidad: 2,
        precio: 230,
        stock: 12
    },
    {
        nombre: "Kápe Intenso",
        descripcion: "Perfil fuerte pensado para los amantes del café intenso.",
        imagen: "../assets/images/catalogo/06.png",
        etiquetas: ["Especialidad"],
        tueste: "Oscuro",
        notasCata: ["Cacao", "Nuez", "Caramelo"],
        intensidad: 5,
        precio: 290,
        stock: 5
    }
];

// mostrar productos
function mostrarCafes(listaCafes) {
    const contenedor = document.getElementById("catalogo-productos");
    contenedor.innerHTML = "";

    listaCafes.forEach(cafe => {
        const tarjeta = `
            <div class="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch">
                <div class="card card-producto border-0 shadow-sm w-100 position-relative">
                    <img src="${cafe.imagen}" class="card-img-top" alt="${cafe.nombre}">
                    <span
                        class="position-absolute top-0 start-0 m-3 px-2 py-1 rounded text-uppercase font-monospace"
                        style="background-color: #8C4327; color: #F5EBE6; font-size: 0.65rem; letter-spacing: 1px; font-weight: bold;">
                        ${cafe.etiquetas.join(" ")}
                    </span>
                    <div class="card-body d-flex flex-column justify-content-between text-start">
                        <div>
                            <h5 class="card-title fw-bold text-center mb-2">
                                ${cafe.nombre}
                            </h5>
                            <p class="card-text text-muted text-center small mb-3">
                                ${cafe.notasCata.join(", ")}
                            </p>
                        </div>
                        <div class="d-flex justify-content-around text-muted small mb-3 py-2">
                            <span>
                                <i class="bi bi-fire me-1"></i>
                                ${cafe.tueste.toUpperCase()}
                            </span>
                            <span>
                                Intensidad ${cafe.intensidad}/5
                            </span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="fs-5 fw-bold text-dark">
                                $${cafe.precio}
                            </span>
                            <a href="#" class="btn btn-agregar">
                                Agregar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
}

// filtro orden de precio cafés
document.addEventListener("DOMContentLoaded", () => {
    // Primera carga, mostrar TODOS
    mostrarCafes(cafes);
    const selectOrden = document.getElementById("ordenar-precio");
    selectOrden.addEventListener("change", () => {
        const opcionSeleccionada = selectOrden.value;
        let cafesOrdenados = [...cafes];
        if (opcionSeleccionada === "mayor-menor") {
            cafesOrdenados.sort((a, b) => b.precio - a.precio);
        } else if (opcionSeleccionada === "menor-mayor") {
            cafesOrdenados.sort((a, b) => a.precio - b.precio);
        }
        mostrarCafes(cafesOrdenados);
    });
});

