import { addToCart } from "./carrito.js";

let cafe = null;

// ======================================================
// OBTENER ID DEL PRODUCTO DESDE LA URL
// ======================================================

const parametros = new URLSearchParams(window.location.search);
const idCafe = Number(parametros.get("id"));

// ======================================================
// OBTENER PRODUCTO DEL BACKEND
// ======================================================

async function obtenerCafe(id) {
    try {
        const response = await fetch(
            `http://localhost:8080/api/products/${id}`
        );
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        cafe = await response.json();
        mostrarCafe(cafe);
    } catch (error) {
        console.error(
            "Error al cargar el producto:",
            error
        );
    }
}

// ======================================================
// INICIALIZAR PÁGINA
// ======================================================

document.addEventListener("DOMContentLoaded", async () => {
    if (!idCafe) {
        console.error("No se recibió un ID de producto válido.");
        return;
    }
    await obtenerCafe(idCafe);

    // ==================================================
    // CANTIDAD
    // ==================================================

    const cantidadInput = document.querySelector(".cantidad-producto");
    const botonAgregar = document.querySelector(".producto-agregar-boton");
    if (!cantidadInput || !botonAgregar) {
        console.error(
            "No se encontraron los elementos del producto."
        );
        return;
    }

    // ==================================================
    // AGREGAR AL CARRITO
    // ==================================================

    botonAgregar.addEventListener("click", () => {
        if (!cafe) {
            console.error("El producto todavía no está disponible.");
            return;
        }

        const cantidad = Number(cantidadInput.value);
        if (
            !Number.isInteger(cantidad) ||
            cantidad < 1 ||
            cantidad > 10
        ) {
            alert("Selecciona una cantidad válida.");
            return;
        }

        const botonMoliendaSeleccionada = document.querySelector(".molienda-seleccionada");
        if (!botonMoliendaSeleccionada) {
            alert("Selecciona un tipo de molienda.");
            return;
        }

        const molienda = botonMoliendaSeleccionada.textContent.trim();
        const productoCarrito = {
            id: cafe.idCafe,
            name: cafe.nombreCafe,
            price: Number(cafe.precioCafe),
            image: cafe.imagenCafe,
            molienda: molienda

        };

        addToCart(
            productoCarrito,
            cantidad
        );
    });


    // ==================================================
    // BOTONES DE MOLIENDA
    // ==================================================

    const botonesMolienda = document.querySelectorAll(".molienda-boton");
    botonesMolienda.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesMolienda.forEach(boton => {
                boton.classList.remove(
                    "molienda-seleccionada"
                );
            });
            boton.classList.add(
                "molienda-seleccionada"
            );
        });
    });
});


// ======================================================
// MOSTRAR PRODUCTO
// ======================================================

function mostrarCafe(cafe) {
    document.getElementById("producto-nombre").textContent = cafe.nombreCafe;
    document.getElementById("producto-etiqueta").textContent = cafe.etiquetasCafe;
    document.getElementById("producto-precio").textContent = `$${Number(cafe.precioCafe).toFixed(2)}`;
    document.getElementById("producto-tueste").textContent = cafe.tuesteCafe;
    document.getElementById("producto-notas").textContent = cafe.notasCataCafe;
    document.getElementById("producto-descripcion").textContent = cafe.descripcionCafe;
    document.getElementById("historia-nombre").textContent = cafe.nombreCafe;

    const imagen = document.getElementById("producto-imagen");
    imagen.src = cafe.imagenCafe;
    imagen.alt =
        `Café ${cafe.nombreCafe}`;

    mostrarIntensidad(
        cafe.intensidadCafe
    );
}

// ======================================================
// MOSTRAR INTENSIDAD
// ======================================================

function mostrarIntensidad(intensidad) {
    const contenedor =
        document.getElementById("producto-intensidad");
    contenedor.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        const barra =
            document.createElement("span");
        if (i <= intensidad) {
            barra.classList.add(
                "barra-llena"
            );
        } else {
            barra.classList.add(
                "barra-vacia"
            );
        }
        contenedor.appendChild(
            barra
        );
    }
}