// ======================================================
// DATOS DEL CLIENTE
// ======================================================

const nombre = sessionStorage.getItem("nombre") || "";
const apellido = sessionStorage.getItem("apellido") || "";
const direccion = sessionStorage.getItem("direccion") || "";
const ciudad = sessionStorage.getItem("ciudad") || "";
const codigoPostal = sessionStorage.getItem("codigoPostal") || "";
const pais = sessionStorage.getItem("pais") || "";

document.querySelector("#nombre-cliente").textContent = nombre;
document.querySelector("#apellido-cliente").textContent = apellido;
document.querySelector("#direccion-cliente").textContent = direccion;
document.querySelector("#ciudad-cliente").textContent = ciudad;
document.querySelector("#codigo-postal-cliente").textContent = codigoPostal;
document.querySelector("#pais-cliente").textContent = pais;


// ======================================================
// MÉTODO DE PAGO
// ======================================================

const paymentMethod = sessionStorage.getItem("paymentMethod");

console.log("Método de pago recuperado:", paymentMethod);

let paymentText = "Método de pago no seleccionado";

if (paymentMethod === "transferencia") {
    paymentText = "Transferencia bancaria";
} else if (paymentMethod === "debito") {
    paymentText = "Tarjeta de débito";
} else if (paymentMethod === "credito") {
    paymentText = "Tarjeta de crédito";
}

document.querySelector("#metodo-pago").textContent = paymentText;


// ======================================================
// ÚLTIMOS 4 DÍGITOS DE LA TARJETA
// ======================================================

const numeroTarjeta =
    sessionStorage.getItem("numeroTarjeta") || "";

if (numeroTarjeta.length >= 4) {

    const ultimosCuatro =
        numeroTarjeta.slice(-4);

    document.querySelector("#detalles-pago").textContent =
        `**** **** **** ${ultimosCuatro}`;

} else {

    document.querySelector("#detalles-pago").textContent =
        "Información de pago registrada";

}


// ======================================================
// MÉTODO DE ENVÍO
// ======================================================

const shippingMethod =
    sessionStorage.getItem("shippingMethod");

console.log(
    "Método de envío recuperado:",
    shippingMethod
);

let shippingText = "Envío estándar";
let shippingDescription = "Entrega estimada: 3–5 días hábiles";

if (shippingMethod === "estandar") {

    shippingText = "Envío estándar";
    shippingDescription = "Entrega estimada: 3–5 días hábiles";

} else if (shippingMethod === "express") {

    shippingText = "Envío express";
    shippingDescription = "Entrega estimada: 1–2 días hábiles";

} else if (shippingMethod === "plus") {

    shippingText = "Envío Plus";
    shippingDescription = "Entrega estimada: 24–48 horas";
}

document.querySelector("#metodo-envio").textContent =
    shippingText;

document.querySelector("#entrega-estimada").textContent =
    shippingDescription;


// ======================================================
// CARRITO
// ======================================================

const CART_STORAGE_KEY = "kape_cart";

const shippingPrices = {
    estandar: 35,
    express: 80,
    plus: 120
};


// ======================================================
// CARGAR CARRITO
// ======================================================

function cargarCarrito() {

    try {

        const carritoGuardado =
            localStorage.getItem(CART_STORAGE_KEY);

        if (!carritoGuardado) {
            return [];
        }

        const carrito =
            JSON.parse(carritoGuardado);

        return Array.isArray(carrito)
            ? carrito
            : [];

    } catch (error) {

        console.error(
            "Error al cargar el carrito:",
            error
        );

        return [];
    }
}


// ======================================================
// FORMATO DE PRECIO
// ======================================================

function formatoPrecio(precio) {

    return `$${Number(precio).toFixed(2)} MXN`;

}


// ======================================================
// MOSTRAR PRODUCTOS DEL CARRITO
// ======================================================

function mostrarProductosCarrito() {

    const contenedor =
        document.querySelector("#payment-summary-products");

    if (!contenedor) {
        return;
    }

    const carrito =
        cargarCarrito();

    contenedor.innerHTML = "";


    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <p class="checkout-empty">
                Tu carrito está vacío.
            </p>
        `;

        actualizarTotales(0);

        return;
    }


    carrito.forEach(producto => {

        const subtotalProducto =
            Number(producto.price) *
            Number(producto.quantity);


        const productoHTML =
            document.createElement("div");

        productoHTML.className =
            "summary-product";


        productoHTML.innerHTML = `

            <img
                src="${producto.image}"
                alt="${producto.name}"
            >

            <div>

                <strong>
                    ${producto.name}
                </strong>

                <p>
                    Cantidad: ${producto.quantity}
                </p>

                <p>
                    Molienda: ${producto.molienda || "Grano Entero"}
                </p>

            </div>

            <strong>
                ${formatoPrecio(subtotalProducto)}
            </strong>

        `;

        contenedor.appendChild(productoHTML);

    });


    actualizarTotales(carrito);

}


// ======================================================
// ACTUALIZAR TOTALES
// ======================================================

function actualizarTotales(carrito) {

    const listaCarrito =
        Array.isArray(carrito)
            ? carrito
            : cargarCarrito();


    const subtotal =
        listaCarrito.reduce(
            (total, producto) => {

                return total +
                    (
                        Number(producto.price) *
                        Number(producto.quantity)
                    );

            },
            0
        );


    const shippingCost =
        shippingPrices[shippingMethod] || 0;


    const total =
        subtotal + shippingCost;


    document.querySelector("#payment-subtotal")
        .textContent = formatoPrecio(subtotal);

    document.querySelector("#payment-shipping")
        .textContent = formatoPrecio(shippingCost);

    document.querySelector("#payment-total")
        .textContent = formatoPrecio(total);

}


// ======================================================
// INICIALIZAR
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        mostrarProductosCarrito();

    }
);