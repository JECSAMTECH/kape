import { iniciarNavbar } from "../JS/navbar.js";


async function cargarNavbar() {


    const respuesta = await fetch("../HTML/navbar.html");
    const navbar = await respuesta.text();


    document.getElementById("navbarInject").innerHTML = navbar;


    iniciarNavbar();
}


cargarNavbar();
//script
