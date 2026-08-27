// ======================================================
// CARRITO DE COMPRA
// ======================================================

const CART_STORAGE_KEY = "kape_cart";

let cart = loadCart();
let actualizarCarritoUI = null;


export function addToCart(product, quantity = 1) {

    const existingProduct =
        cart.find(
            item => item.id === product.id
        );

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            ...product,

            quantity

        });

    }

    saveCart();

    if (actualizarCarritoUI) {
        actualizarCarritoUI();
    }

}





// ======================================================
// LOCAL STORAGE
// ======================================================

function loadCart() {

    try {

        const savedCart =
            localStorage.getItem(CART_STORAGE_KEY);

        if (!savedCart) {
            return [];
        }

        const parsedCart =
            JSON.parse(savedCart);

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        return parsedCart;

    } catch (error) {

        console.error(
            "Error al cargar el carrito:",
            error
        );

        return [];

    }
}


function saveCart() {

    try {

        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "Error al guardar el carrito:",
            error
        );

    }
}


// ======================================================
// INICIALIZAR CARRITO
// ======================================================

export function iniciarCarrito() {

    console.log("🛒 Carrito inicializando...");


    // ==================================================
    // ELEMENTOS DEL DOM
    // ==================================================

    const cartButton =
        document.getElementById("cart-button");

    const cartOffcanvas =
        document.getElementById("cart-offcanvas");

    const cartItems =
        document.getElementById("cart-items");

    const cartEmpty =
        document.getElementById("cart-empty");

    const cartCount =
        document.getElementById("cart-count");

    const cartSubtotal =
        document.getElementById("cart-subtotal");

    const cartCheckout =
        document.getElementById("cart-checkout");


    // Verificar que existan los elementos
    const missing = [];
    if (!cartButton) missing.push("cart-button");
    if (!cartOffcanvas) missing.push("cart-offcanvas");
    if (!cartItems) missing.push("cart-items");
    if (!cartEmpty) missing.push("cart-empty");
    if (!cartCount) missing.push("cart-count");
    if (!cartSubtotal) missing.push("cart-subtotal");
    if (!cartCheckout) missing.push("cart-checkout");

    if (missing.length > 0) {
        console.error(
            "No se encontraron todos los elementos del carrito. Faltan:",
            missing.join(", ")
        );
        return;
    }


    // ==================================================
    // BOOTSTRAP OFFCANVAS
    // ==================================================

    let bootstrapCart = null;
    try {
        if (window.bootstrap?.Offcanvas) {
            bootstrapCart = window.bootstrap.Offcanvas.getOrCreateInstance(cartOffcanvas);
        }
    } catch (e) {
        console.warn("Bootstrap Offcanvas aviso:", e.message);
    }

    function abrirCarrito() {
        if (!bootstrapCart && window.bootstrap?.Offcanvas) {
            try {
                bootstrapCart = window.bootstrap.Offcanvas.getOrCreateInstance(cartOffcanvas);
            } catch (e) {}
        }

        if (bootstrapCart) {
            try {
                bootstrapCart.show();
                return;
            } catch (e) {}
        }

        // Respaldo cuando Bootstrap todavía no está disponible o falla.
        cartOffcanvas.classList.add("show");
        cartOffcanvas.style.visibility = "visible";
        cartOffcanvas.setAttribute("aria-modal", "true");
        cartOffcanvas.removeAttribute("aria-hidden");
    }

    function cerrarCarrito() {
        if (bootstrapCart) {
            try {
                bootstrapCart.hide();
                return;
            } catch (e) {}
        }

        cartOffcanvas.classList.remove("show");
        cartOffcanvas.style.visibility = "";
        cartOffcanvas.removeAttribute("aria-modal");
        cartOffcanvas.setAttribute("aria-hidden", "true");
    }


    // ==================================================
    // ABRIR CARRITO DESDE EL BOTÓN
    // ==================================================

    document.addEventListener("click", (event) => {
        if (event.target.closest("#cart-button")) {
            event.preventDefault();
            abrirCarrito();
        }
    });

    document.getElementById("cart-close")
        ?.addEventListener("click", cerrarCarrito);

    document.getElementById("cart-continue")
        ?.addEventListener("click", cerrarCarrito);


    // ==================================================
    // AGREGAR PRODUCTO
    // ==================================================



    // ==================================================
    // ELIMINAR PRODUCTO
    // ==================================================

    function removeFromCart(productId) {

        cart = cart.filter(
            item => item.id !== productId
        );


        saveCart();

        updateCart();

    }


    // ==================================================
    // CAMBIAR CANTIDAD
    // ==================================================

    function changeQuantity(
        productId,
        change
    ) {

        const product =
            cart.find(
                item => item.id === productId
            );


        if (!product) {
            return;
        }


        product.quantity += change;


        if (product.quantity <= 0) {

            removeFromCart(productId);

            return;

        }


        saveCart();

        updateCart();

    }


    // ==================================================
    // ACTUALIZAR CARRITO
    // ==================================================

    function updateCart() {

        renderCart();

        updateCartCount();

        updateCartSubtotal();

    }

    actualizarCarritoUI = updateCart;


    // ==================================================
    // RENDERIZAR PRODUCTOS
    // ==================================================

    function renderCart() {

        cartItems.innerHTML = "";


        if (cart.length === 0) {

            cartEmpty.style.display = "block";

            return;

        }


        cartEmpty.style.display = "none";


        cart.forEach(product => {

            const cartItem =
                document.createElement("div");


            cartItem.className =
                "cart-item";


            cartItem.dataset.productId =
                product.id;


            cartItem.innerHTML = `
                <div class="d-flex align-items-center gap-3 mb-3 p-2">

                    <img
                        class="cart-item-image"
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div class="cart-item-info">

                        <h3 class="cart-item-name">
                            ${product.name}
                        </h3>

                        <span class="cart-item-price">
                            $${product.price.toFixed(2)}
                        </span>

                        <div class="cart-item-actions">

                            <button
                                type="button"
                                class="quantity-btn btn-offcanva"
                                data-action="decrease"
                                aria-label="Disminuir cantidad"
                            >
                                −
                            </button>

                            <span
                                class="cart-item-quantity"
                                aria-label="Cantidad"
                            >
                                ${product.quantity}
                            </span>

                            <button
                                type="button"
                                class="quantity-btn btn-offcanva"
                                data-action="increase"
                                aria-label="Aumentar cantidad"
                            >
                                +
                            </button>

                            <button
                                type="button"
                                class="cart-item-remove btn-offcanva"
                                data-action="remove"
                            >
                                Eliminar
                            </button>

                        </div>

                    </div>
                </div>
            `;


            cartItems.appendChild(cartItem);

        });

    }


    // ==================================================
    // CONTADOR
    // ==================================================

    function updateCartCount() {

        const totalItems =
            cart.reduce(
                (total, product) =>
                    total + product.quantity,
                0
            );


        cartCount.textContent =
            totalItems;

    }


    // ==================================================
    // SUBTOTAL
    // ==================================================

    function updateCartSubtotal() {

        const subtotal =
            cart.reduce(
                (total, product) =>
                    total +
                    (
                        product.price *
                        product.quantity
                    ),
                0
            );


        cartSubtotal.textContent =
            `$${subtotal.toFixed(2)}`;

    }


    // ==================================================
    // EVENT DELEGATION
    // ==================================================

    cartItems.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest("button");


            if (!button) {
                return;
            }


            const cartItem =
                button.closest(".cart-item");


            if (!cartItem) {
                return;
            }


            const productId =
                Number(
                    cartItem.dataset.productId
                );


            const action =
                button.dataset.action;


            switch (action) {

                case "increase":

                    changeQuantity(
                        productId,
                        1
                    );

                    break;


                case "decrease":

                    changeQuantity(
                        productId,
                        -1
                    );

                    break;


                case "remove":

                    removeFromCart(
                        productId
                    );

                    break;

            }

        }
    );


    // ==================================================
    // CHECKOUT
    // ==================================================

    cartCheckout.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Tu carrito está vacío."
                );

                return;

            }


            saveCart();

            window.location.href =
                "finalizarCompra.html";

        }
    );


    // ==================================================
    // ESTADO INICIAL
    // ==================================================

    updateCart();


    // ==================================================
    // PRUEBA TEMPORAL
    // ==================================================

    //     addToCart({

    //         id: 1,

    //         name: "Café de prueba 1",

    //         price: 50,

    //         image:
    //             "../assets/images/producto/producto.jpeg"

    //     });

    //     addToCart({

    //         id: 2,

    //         name: "Café de prueba 2",

    //         price: 30,

    //         image:
    //             "../assets/images/producto/producto.jpeg"

    //     });

}


