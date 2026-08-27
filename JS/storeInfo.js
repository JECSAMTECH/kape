
const checkoutForm = document.querySelector("#checkout-form");

checkoutForm.addEventListener("submit", function (event) {

    const nombre = document.querySelector('[placeholder="Nombre"]').value;
    console.log("Nombre:", nombre);
    sessionStorage.setItem("nombre", nombre);

    const apellido = document.querySelector('[placeholder="Apellido"]').value;
    console.log("Apellido:", apellido);
    sessionStorage.setItem("apellido", apellido);

    const direccion = document.querySelector('[placeholder="Dirección"]').value;
    console.log("Dirección:", direccion);
    sessionStorage.setItem("direccion", direccion);

    const ciudad = document.querySelector('[placeholder="Ciudad"]').value;
    console.log("Ciudad:", ciudad);
    sessionStorage.setItem("ciudad", ciudad);


    const codigoPostal = document.querySelector('[placeholder="Código Postal"]').value;
    console.log("Código Postal:", codigoPostal);
    sessionStorage.setItem("codigoPostal", codigoPostal);


    const pais = document.querySelector("#country").value;
    console.log("País:", pais);
    sessionStorage.setItem("pais", pais);

    const paymentMethod = document.querySelector(
        'input[name="payment-method"]:checked'
    ).value;
    console.log("Método de pago:", paymentMethod);
    sessionStorage.setItem("paymentMethod", paymentMethod);


    const numeroTarjeta = document.querySelector(
        '[placeholder="**** **** **** 4242"]'
    ).value;
    console.log("Número de tarjeta:", numeroTarjeta);
    sessionStorage.setItem("numeroTarjeta", numeroTarjeta);


    const fechaVencimiento = document.querySelector(
        '[placeholder="MM/AA"]'
    ).value;
    console.log("Fecha de vencimiento:", fechaVencimiento);
    sessionStorage.setItem("fechaVencimiento", fechaVencimiento);


    const cvv = document.querySelector(
        '[placeholder="CVV"]'
    ).value;
    console.log("CVV:", cvv);
    sessionStorage.setItem("cvv", cvv);

    const shippingMethod = document.querySelector(
        'input[name="shipping-method"]:checked'
    ).value;
    console.log("Método de envío:", shippingMethod);
    sessionStorage.setItem("shippingMethod", shippingMethod);
});