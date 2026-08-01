document.addEventListener("DOMContentLoaded", async () => {

    const parametros = new URLSearchParams(location.search);

    let op = parametros.get("op");

    // Si viene de Mercado Pago
    if (!op) {

        const paymentId = parametros.get("payment_id");

        if (paymentId) {

            try {

                const respuesta = await API.obtenerOperacionPorPaymentId(paymentId);

                if (respuesta.ok) {
                    op = respuesta.operacion;
                }

            } catch (error) {

                console.error(error);

            }

        }

    }

    document.getElementById("operacion").textContent =
        op || "Procesando...";

    document.getElementById("btnInicio").onclick = () => {

        location.href = "index.html";

    };

});