import { addToCart } from "./carrito.js";


// ======================================================
// PRODUCTO
// ======================================================

const producto = {
    id: 1,
    name: "Cafe Prueba 1",
    price: 430.12,
    image: "../assets/images/catalogo/02.png"
};


// ======================================================
// INICIALIZAR PÁGINA DE PRODUCTO
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const cantidadInput =
        document.querySelector(".cantidad-producto");

    const agregarButton =
        document.querySelector(".producto-agregar-boton");


    if (!cantidadInput || !agregarButton) {

        console.error(
            "No se encontraron los elementos del producto."
        );

        return;

    }


    // ==================================================
    // AGREGAR AL CARRITO
    // ==================================================

    agregarButton.addEventListener("click", () => {

        const cantidad =
            Number(cantidadInput.value);


        if (
            !Number.isInteger(cantidad) ||
            cantidad < 1 ||
            cantidad > 10
        ) {

            alert(
                "Selecciona una cantidad válida."
            );

            return;

        }


        addToCart(
            producto,
            cantidad
        );

    });

});

const cafes = [
    {
        id_cafe:1,
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
        id_cafe:2,
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
        id_cafe:3,
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
        id_cafe:4,
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
        id_cafe:5,
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
        id_cafe:6,
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


const parametros = new URLSearchParams(window.location.search);
const idCafe = Number(parametros.get("id"));

const cafe = cafes.find(cafe => cafe.id_cafe === idCafe);
if (cafe) {
    mostrarCafe(cafe);
}else{
    console.log("error, este producto no existe.");
}

const botonAgregar = document.querySelector(".producto-agregar-boton");
botonAgregar.addEventListener("click", () => {
    const cantidad = Number(
        document.querySelector(".cantidad-producto").value
    );
    const botonMoliendaSeleccionada = document.querySelector(".molienda-seleccionada");
    const molienda = botonMoliendaSeleccionada.textContent.trim();
    const productoCarrito = {
        id: cafe.id_cafe,
        name: cafe.nombre,
        price: cafe.precio,
        image: cafe.imagen,
        molienda: molienda
    };
    addToCart(productoCarrito, cantidad);
});
// botones molienda, cuál seleccionó el cliente
const botonesMolienda = document.querySelectorAll(".molienda-boton");
botonesMolienda.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesMolienda.forEach(boton => {
            boton.classList.remove("molienda-seleccionada");
        });
        boton.classList.add("molienda-seleccionada");
    });
});


//console.log(cafe);

//mostrar datos en front
function mostrarCafe(cafe) {
    document.getElementById("producto-nombre").textContent = cafe.nombre;
    document.getElementById("producto-etiqueta").textContent = cafe.etiquetas.join(" • ");
    document.getElementById("producto-precio").textContent = `$${cafe.precio.toFixed(2)}`;
    document.getElementById("producto-tueste").textContent = cafe.tueste;
    document.getElementById("producto-notas").textContent = cafe.notasCata.join(", ");
    document.getElementById("producto-descripcion").textContent = cafe.descripcion;
    document.getElementById("historia-nombre").textContent = cafe.nombre;

    const imagen = document.getElementById("producto-imagen");

    imagen.src = cafe.imagen;
    imagen.alt = `Café ${cafe.nombre}`;

    mostrarIntensidad(cafe.intensidad);
}

// función para mostrar gráficamente la intensidad del café
function mostrarIntensidad(intensidad) {
    const contenedor = document.getElementById("producto-intensidad");
    contenedor.innerHTML = "";
    for (let i = 1; i <= 4; i++) {
        const barra = document.createElement("span");
        if (i <= intensidad) {
            barra.classList.add("barra-llena");
        } else {
            barra.classList.add("barra-vacia");
        }

        contenedor.appendChild(barra);
    }
}
// carga de la función al cargar la página
function verDetalles(id_cafe) {
    window.location.href = `producto.html?id=${id_cafe}`;
}
