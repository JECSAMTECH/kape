
// import { iniciarNavbar } from "../JS/navbar.js";


// async function cargarNavbar() {


//     const respuesta = await fetch("../HTML/navbar.html");
//     const navbar = await respuesta.text();


//     document.getElementById("navbarInject").innerHTML = navbar;


//     iniciarNavbar();
// }


// cargarNavbar();
// //script

// import { iniciarNavbar } from "./navbar.js";

// async function cargarNavbar() {
//     const rutaNavbar = window.location.pathname.includes("/HTML/")
//         ? "./navbar.html"
//         : "./HTML/navbar.html";

//     const respuesta = await fetch(rutaNavbar);
//     const navbar = await respuesta.text();

//     document.getElementById("navbarInject").innerHTML = navbar;

//     iniciarNavbar();
// }

// cargarNavbar();


import { iniciarNavbar } from "./navbar.js";
import { iniciarCarrito, addToCart } from "./carrito.js";


async function cargarNavbar() {

    const rutaNavbar =
        window.location.pathname.includes("/HTML/")
            ? "./navbar.html"
            : "./HTML/navbar.html";


    const respuesta = await fetch(rutaNavbar);

    const navbar = await respuesta.text();


    document.getElementById("navbarInject").innerHTML = navbar;


    // El navbar ya fue insertado en el DOM
    iniciarNavbar();

    // Ahora podemos inicializar el carrito
    iniciarCarrito();

}


cargarNavbar();
