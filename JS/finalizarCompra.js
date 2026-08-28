const CART_STORAGE_KEY = "kape_cart";

const checkoutItems = document.querySelector("#checkout-items");
const checkoutSubtotal = document.querySelector("#checkout-subtotal");
const checkoutShipping = document.querySelector("#checkout-shipping");
const checkoutTotal = document.querySelector("#checkout-total");

// ======================================================
// COSTOS DE ENVÍO
// ======================================================

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
// FORMATEAR PRECIO
// ======================================================

function formatoPrecio(precio) {

    return `$${precio.toFixed(2)} MXN`;


}

// ======================================================
// CALCULAR SUBTOTAL
// ======================================================

function calcularSubtotal(carrito) {

    return carrito.reduce(
        (total, producto) => {

            return total +
                (producto.price * producto.quantity);

        },
        0
    );


}

// ======================================================
// MOSTRAR PRODUCTOS
// ======================================================

function mostrarProductos() {

    const carrito = cargarCarrito();

    checkoutItems.innerHTML = "";


    if (carrito.length === 0) {

        checkoutItems.innerHTML = `
        <p class="checkout-empty">
            Tu carrito está vacío.
        </p>
    `;

        checkoutSubtotal.textContent =
            "$0.00 MXN";

        checkoutShipping.textContent =
            "$0.00 MXN";

        checkoutTotal.textContent =
            "$0.00 MXN";

        return;

    }


    carrito.forEach(producto => {

        const subtotalProducto =
            producto.price * producto.quantity;


        const productoHTML =
            document.createElement("div");


        productoHTML.className =
            "checkout-item";


        productoHTML.innerHTML = `

        <div class="checkout-item-info">

            <img
                src="${producto.image}"
                alt="${producto.name}"
                class="checkout-item-image"
            >

            <div class="checkout-item-details">

                <h3>
                    ${producto.name}
                </h3>

                <p>
                    ${producto.molienda}
                </p>

                <p>
                    Cantidad: ${producto.quantity}
                </p>

            </div>

        </div>

        <span class="checkout-item-price">
            ${formatoPrecio(subtotalProducto)}
        </span>

    `;


        checkoutItems.appendChild(
            productoHTML
        );

    });


    actualizarTotales();


}

// ======================================================
// ACTUALIZAR TOTALES
// ======================================================

function actualizarTotales() {

    const carrito =
        cargarCarrito();


    const subtotal =
        calcularSubtotal(carrito);


    // Buscar método de envío seleccionado
    const shippingSelected =
        document.querySelector(
            'input[name="shipping-method"]:checked'
        );


    const shippingMethod =
        shippingSelected
            ? shippingSelected.value
            : null;


    const shippingCost =
        shippingMethod
            ? shippingPrices[shippingMethod]
            : 0;


    const total =
        subtotal + shippingCost;


    checkoutSubtotal.textContent =
        formatoPrecio(subtotal);


    checkoutShipping.textContent =
        formatoPrecio(shippingCost);


    checkoutTotal.textContent =
        formatoPrecio(total);


}

// ======================================================
// EVENTOS DE MÉTODO DE ENVÍO
// ======================================================

function configurarEnvio() {

    const shippingOptions =
        document.querySelectorAll(
            'input[name="shipping-method"]'
        );


    shippingOptions.forEach(
        option => {

            option.addEventListener(
                "change",
                actualizarTotales
            );

        }
    );


}

// ======================================================
// INICIALIZAR
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarDatosCheckout();

        mostrarProductos();

        configurarEnvio();

        actualizarTotales();

    }
);


// ======================================================
// RECUPERAR DATOS PREVIOS DEL CHECKOUT
// ======================================================

function cargarDatosCheckout() {

    const nombre =
        sessionStorage.getItem("nombre");

    const apellido =
        sessionStorage.getItem("apellido");

    const direccion =
        sessionStorage.getItem("direccion");

    const ciudad =
        sessionStorage.getItem("ciudad");

    const codigoPostal =
        sessionStorage.getItem("codigoPostal");

    const pais =
        sessionStorage.getItem("pais");

    const paymentMethod =
        sessionStorage.getItem("paymentMethod");

    const shippingMethod =
        sessionStorage.getItem("shippingMethod");


    // ==========================================
    // DATOS PERSONALES
    // ==========================================

    const inputNombre =
        document.querySelector('[placeholder="Nombre"]');

    const inputApellido =
        document.querySelector('[placeholder="Apellido"]');

    const inputDireccion =
        document.querySelector('[placeholder="Dirección"]');

    const inputCiudad =
        document.querySelector('[placeholder="Ciudad"]');

    const inputCodigoPostal =
        document.querySelector('[placeholder="Código Postal"]');

    const selectPais =
        document.querySelector("#country");


    if (inputNombre && nombre) {
        inputNombre.value = nombre;
    }

    if (inputApellido && apellido) {
        inputApellido.value = apellido;
    }

    if (inputDireccion && direccion) {
        inputDireccion.value = direccion;
    }

    if (inputCiudad && ciudad) {
        inputCiudad.value = ciudad;
    }

    if (inputCodigoPostal && codigoPostal) {
        inputCodigoPostal.value = codigoPostal;
    }

    if (selectPais && pais) {
        selectPais.value = pais;
    }


    // ==========================================
    // MÉTODO DE PAGO
    // ==========================================

    if (paymentMethod) {

        const paymentRadio =
            document.querySelector(
                `input[name="payment-method"][value="${paymentMethod}"]`
            );

        if (paymentRadio) {
            paymentRadio.checked = true;
        }

    }


    // ==========================================
    // MÉTODO DE ENVÍO
    // ==========================================

    if (shippingMethod) {

        const shippingRadio =
            document.querySelector(
                `input[name="shipping-method"][value="${shippingMethod}"]`
            );

        if (shippingRadio) {
            shippingRadio.checked = true;
        }

    }

}