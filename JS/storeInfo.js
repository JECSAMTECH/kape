const checkoutForm = document.querySelector("#checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        // ==========================================
        // INFORMACIÓN DE ENVÍO
        // ==========================================

        const nombre =
            document.querySelector('[placeholder="Nombre"]').value.trim();

        const apellido =
            document.querySelector('[placeholder="Apellido"]').value.trim();

        const direccion =
            document.querySelector('[placeholder="Dirección"]').value.trim();

        const ciudad =
            document.querySelector('[placeholder="Ciudad"]').value.trim();

        const codigoPostal =
            document.querySelector('[placeholder="Código Postal"]').value.trim();

        const pais =
            document.querySelector("#country").value;


        sessionStorage.setItem("nombre", nombre);
        sessionStorage.setItem("apellido", apellido);
        sessionStorage.setItem("direccion", direccion);
        sessionStorage.setItem("ciudad", ciudad);
        sessionStorage.setItem("codigoPostal", codigoPostal);
        sessionStorage.setItem("pais", pais);


        // ==========================================
        // MÉTODO DE PAGO
        // ==========================================

        const paymentSelected =
            document.querySelector(
                'input[name="payment-method"]:checked'
            );

        if (paymentSelected) {

            sessionStorage.setItem(
                "paymentMethod",
                paymentSelected.value
            );

        }


        // ==========================================
        // TARJETA
        // ==========================================
        // NO guardamos número completo.
        // NO guardamos CVV.
        // Solo guardamos los últimos 4 dígitos.

        const numeroTarjetaInput =
            document.querySelector(
                '[placeholder="**** **** **** 4242"]'
            );

        if (numeroTarjetaInput) {

            const numeroTarjeta =
                numeroTarjetaInput.value.replace(/\D/g, "");

            if (numeroTarjeta.length >= 4) {

                const ultimosCuatro =
                    numeroTarjeta.slice(-4);

                sessionStorage.setItem(
                    "ultimosCuatroTarjeta",
                    ultimosCuatro
                );

            }

        }


        // ==========================================
        // MÉTODO DE ENVÍO
        // ==========================================

        const shippingSelected =
            document.querySelector(
                'input[name="shipping-method"]:checked'
            );

        if (shippingSelected) {

            sessionStorage.setItem(
                "shippingMethod",
                shippingSelected.value
            );

        }

    });

}