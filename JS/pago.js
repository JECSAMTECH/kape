// ======================================================
// CONFIGURACIÓN
// ======================================================

const CART_STORAGE_KEY = "kape_cart";
const ORDERS_STORAGE_KEY = "kape_orders";


// ======================================================
// DATOS DEL CLIENTE
// ======================================================

const nombre =
    sessionStorage.getItem("nombre") || "";

const apellido =
    sessionStorage.getItem("apellido") || "";

const direccion =
    sessionStorage.getItem("direccion") || "";

const ciudad =
    sessionStorage.getItem("ciudad") || "";

const codigoPostal =
    sessionStorage.getItem("codigoPostal") || "";

const pais =
    sessionStorage.getItem("pais") || "";


// ======================================================
// MÉTODO DE PAGO
// ======================================================

const paymentMethod =
    sessionStorage.getItem("paymentMethod") || "";

const ultimosCuatroTarjeta =
    sessionStorage.getItem("ultimosCuatroTarjeta") || "";


// ======================================================
// MÉTODO DE ENVÍO
// ======================================================

const shippingMethod =
    sessionStorage.getItem("shippingMethod") || "estandar";


// ======================================================
// COSTOS DE ENVÍO
// ======================================================

const shippingPrices = {
    estandar: 35,
    express: 80,
    plus: 120
};


// ======================================================
// MOSTRAR DATOS DEL CLIENTE
// ======================================================

document.querySelector("#nombre-cliente").textContent =
    nombre;

document.querySelector("#apellido-cliente").textContent =
    apellido;

document.querySelector("#direccion-cliente").textContent =
    direccion;

document.querySelector("#ciudad-cliente").textContent =
    ciudad;

document.querySelector("#codigo-postal-cliente").textContent =
    codigoPostal;

document.querySelector("#pais-cliente").textContent =
    pais;


// ======================================================
// MOSTRAR MÉTODO DE PAGO
// ======================================================

let paymentText =
    "Método de pago no seleccionado";

if (paymentMethod === "transferencia") {

    paymentText =
        "Transferencia bancaria";

} else if (paymentMethod === "debito") {

    paymentText =
        "Tarjeta de débito";

} else if (paymentMethod === "credito") {

    paymentText =
        "Tarjeta de crédito";
}

document.querySelector("#metodo-pago").textContent =
    paymentText;


// ======================================================
// MOSTRAR DETALLES DE PAGO
// ======================================================

if (ultimosCuatroTarjeta) {

    document.querySelector("#detalles-pago").textContent =
        `**** **** **** ${ultimosCuatroTarjeta}`;

} else {

    document.querySelector("#detalles-pago").textContent =
        "Información de pago registrada";
}


// ======================================================
// MOSTRAR MÉTODO DE ENVÍO
// ======================================================

let shippingText =
    "Envío estándar";

let shippingDescription =
    "Entrega estimada: 3–5 días hábiles";


if (shippingMethod === "estandar") {

    shippingText =
        "Envío estándar";

    shippingDescription =
        "Entrega estimada: 3–5 días hábiles";

} else if (shippingMethod === "express") {

    shippingText =
        "Envío express";

    shippingDescription =
        "Entrega estimada: 1–2 días hábiles";

} else if (shippingMethod === "plus") {

    shippingText =
        "Envío Plus";

    shippingDescription =
        "Entrega estimada: 24–48 horas";
}


document.querySelector("#metodo-envio").textContent =
    shippingText;

document.querySelector("#entrega-estimada").textContent =
    shippingDescription;


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
// CALCULAR SUBTOTAL
// ======================================================

function calcularSubtotal(carrito) {

    return carrito.reduce(
        (total, producto) => {

            return total +
                (
                    Number(producto.price) *
                    Number(producto.quantity)
                );

        },
        0
    );

}


// ======================================================
// MOSTRAR PRODUCTOS
// ======================================================

function mostrarProductosCarrito() {

    const contenedor =
        document.querySelector(
            "#payment-summary-products"
        );

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
        calcularSubtotal(listaCarrito);


    const shippingCost =
        shippingPrices[shippingMethod] || 0;


    const total =
        subtotal + shippingCost;


    document.querySelector("#payment-subtotal")
        .textContent =
        formatoPrecio(subtotal);


    document.querySelector("#payment-shipping")
        .textContent =
        formatoPrecio(shippingCost);


    document.querySelector("#payment-total")
        .textContent =
        formatoPrecio(total);

}


// ======================================================
// OBTENER PEDIDOS EXISTENTES
// ======================================================

function cargarPedidos() {

    try {

        const pedidosGuardados =
            localStorage.getItem(
                ORDERS_STORAGE_KEY
            );

        if (!pedidosGuardados) {
            return [];
        }

        const pedidos =
            JSON.parse(pedidosGuardados);

        return Array.isArray(pedidos)
            ? pedidos
            : [];

    } catch (error) {

        console.error(
            "Error al cargar los pedidos:",
            error
        );

        return [];
    }

}


// ======================================================
// GENERAR ID DEL PEDIDO
// ======================================================

function generarIdPedido() {

    const timestamp =
        Date.now();

    const numeroAleatorio =
        Math.floor(
            Math.random() * 1000
        )
            .toString()
            .padStart(3, "0");


    return `KAPE-${timestamp}-${numeroAleatorio}`;

}


// ======================================================
// CREAR PEDIDO
// ======================================================

function crearPedido() {

    const carrito =
        cargarCarrito();


    // ==========================================
    // COMPROBAR CARRITO
    // ==========================================

    if (carrito.length === 0) {

        alert(
            "No se puede realizar la compra porque el carrito está vacío."
        );

        return null;
    }


    // ==========================================
    // CALCULAR TOTALES
    // ==========================================

    const subtotal =
        calcularSubtotal(carrito);


    const shippingCost =
        shippingPrices[shippingMethod] || 0;


    const total =
        subtotal + shippingCost;


    // ==========================================
    // CREAR OBJETO DEL PEDIDO
    // ==========================================

    const pedido = {

        id: generarIdPedido(),

        fecha:
            new Date().toISOString(),

        estado:
            "Pagado",


        // ======================================
        // CLIENTE
        // ======================================

        cliente: {

            nombre,

            apellido,

            direccion,

            ciudad,

            codigoPostal,

            pais

        },


        // ======================================
        // PRODUCTOS
        // ======================================

        productos:
            carrito.map(producto => ({

                id:
                    producto.id,

                name:
                    producto.name,

                price:
                    Number(producto.price),

                quantity:
                    Number(producto.quantity),

                molienda:
                    producto.molienda || "Grano Entero",

                image:
                    producto.image,

                resenado:
                    false

            })),


        // ======================================
        // PAGO
        // ======================================

        pago: {

            metodo:
                paymentMethod,

            ultimosCuatro:
                ultimosCuatroTarjeta || null

        },


        // ======================================
        // ENVÍO
        // ======================================

        envio: {

            metodo:
                shippingMethod,

            costo:
                shippingCost

        },


        // ======================================
        // TOTALES
        // ======================================

        subtotal,

        envio:
            shippingCost,

        total

    };


    // ==========================================
    // GUARDAR PEDIDO
    // ==========================================

    const pedidos =
        cargarPedidos();


    pedidos.push(pedido);


    try {

        localStorage.setItem(
            ORDERS_STORAGE_KEY,
            JSON.stringify(pedidos)
        );

    } catch (error) {

        console.error(
            "Error al guardar el pedido:",
            error
        );

        alert(
            "No se pudo guardar el pedido. Intenta nuevamente."
        );

        return null;
    }


    return pedido;

}


// ======================================================
// VACIAR CARRITO
// ======================================================

function vaciarCarrito() {

    localStorage.removeItem(
        CART_STORAGE_KEY
    );

}


// ======================================================
// LIMPIAR DATOS TEMPORALES DEL CHECKOUT
// ======================================================

function limpiarCheckout() {

    sessionStorage.removeItem("nombre");
    sessionStorage.removeItem("apellido");
    sessionStorage.removeItem("direccion");
    sessionStorage.removeItem("ciudad");
    sessionStorage.removeItem("codigoPostal");
    sessionStorage.removeItem("pais");
    sessionStorage.removeItem("paymentMethod");
    sessionStorage.removeItem("shippingMethod");
    sessionStorage.removeItem("ultimosCuatroTarjeta");

}


// ======================================================
// FINALIZAR COMPRA
// ======================================================

function finalizarCompra() {

    console.log(
        "Procesando compra..."
    );


    const pedido =
        crearPedido();


    // Si algo salió mal, NO vaciamos el carrito
    if (!pedido) {
        return;
    }


    // ==========================================
    // PEDIDO GUARDADO CORRECTAMENTE
    // ==========================================

    console.log(
        "Pedido creado:",
        pedido
    );


    // ==========================================
    // VACIAR CARRITO
    // ==========================================

    vaciarCarrito();


    // ==========================================
    // LIMPIAR CHECKOUT
    // ==========================================

    limpiarCheckout();


    // ==========================================
    // CONFIRMACIÓN
    // ==========================================

    alert(
        `¡Compra realizada correctamente!\n\nNúmero de pedido: ${pedido.id}`
    );


    // ==========================================
    // IR AL HISTORIAL
    // ==========================================

    window.location.href =
        "catalogo.html";

}


// ======================================================
// EVENTO DEL BOTÓN "REALIZAR PAGO"
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        mostrarProductosCarrito();


        const botonRealizarPago =
            document.querySelector(
                "#realizar-pago"
            );


        if (!botonRealizarPago) {

            console.error(
                "No se encontró el botón #realizar-pago"
            );

            return;
        }


        botonRealizarPago.addEventListener(
            "click",
            finalizarCompra
        );

    }
);
