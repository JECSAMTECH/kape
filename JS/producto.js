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
