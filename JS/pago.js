const nombre = sessionStorage.getItem("nombre");

const apellido = sessionStorage.getItem("apellido");

const direccion = sessionStorage.getItem("direccion");

const ciudad = sessionStorage.getItem("ciudad");

const codigoPostal = sessionStorage.getItem("codigoPostal");

const pais = sessionStorage.getItem("pais");


document.querySelector("#nombre-cliente").textContent = nombre + " ";

document.querySelector("#apellido-cliente").textContent = apellido;

document.querySelector("#direccion-cliente").textContent = direccion;

document.querySelector("#ciudad-cliente").textContent = ciudad;

document.querySelector("#codigo-postal-cliente").textContent = codigoPostal;

document.querySelector("#pais-cliente").textContent = pais;


// Método de pago

const paymentMethod = sessionStorage.getItem("paymentMethod");

console.log("Método de pago recuperado:", paymentMethod);

let paymentText;

if (paymentMethod === "transferencia") {

    paymentText = "Transferencia bancaria";

} else if (paymentMethod === "debito") {

    paymentText = "Tarjeta de débito";

} else if (paymentMethod === "credito") {

    paymentText = "Tarjeta de crédito";

}

document.querySelector("#metodo-pago").textContent = paymentText;


// Número de tarjeta

const numeroTarjeta = sessionStorage.getItem("numeroTarjeta");

const ultimosCuatro = numeroTarjeta.slice(-4);

document.querySelector("#detalles-pago").textContent =
    `**** **** **** ${ultimosCuatro}`;


// Método de envío

const shippingMethod = sessionStorage.getItem("shippingMethod");

console.log("Método de envío recuperado:", shippingMethod);

let shippingText;

let shippingDescription;

if (shippingMethod === "estandar") {

    shippingText = "Envío estándar";
    shippingDescription = "Entrega estimada: 5–7 días hábiles";

} else if (shippingMethod === "express") {

    shippingText = "Envío express";
    shippingDescription = "Entrega estimada: 2–3 días hábiles";

} else if (shippingMethod === "plus") {

    shippingText = "Envío Plus";
    shippingDescription = "Entrega estimada: 1–2 días hábiles";

}

document.querySelector("#metodo-envio").textContent = shippingText;

document.querySelector("#entrega-estimada").textContent = shippingDescription;