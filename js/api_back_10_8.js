const API = {

    async crearOperacion(id, medio) {

        const url =
            CONFIG.API_URL +
            "?accion=crearOperacion" +
            "&id=" + encodeURIComponent(id) +
            "&medio=" + encodeURIComponent(medio);

        const respuesta = await fetch(url);

        return await respuesta.json();

    },

    async crearPreferencia(id) {

        const respuesta = await fetch(
            CONFIG.API_URL +
            "?accion=crearPreferencia&id=" +
            encodeURIComponent(id)
        );

        return await respuesta.json();

    },

    async obtenerOperacion(op) {

        const respuesta = await fetch(
            CONFIG.API_URL + "?accion=operacion&op=" + op
        );

        return await respuesta.json();

    },

    async entregarOperacion(op) {

        const respuesta = await fetch(
            CONFIG.API_URL + "?accion=entregarOperacion&op=" + op
        );

        return await respuesta.json();

    },

    async obtenerProductos() {

        try {

            const respuesta = await fetch(
                `${CONFIG.API_URL}?accion=productos`
            );

            if (!respuesta.ok) {
                throw new Error("No fue posible conectar con la API.");
            }

            return await respuesta.json();

        } catch (error) {

            console.error(error);

            return [];

        }

    },

    // ==========================================
    // PRODUCTO (ahora recibe ID de Inventario/QR)
    // ==========================================

    async obtenerProducto(id) {

    try {

        const respuesta = await fetch(
            `${CONFIG.API_URL}?accion=producto&id=${encodeURIComponent(id)}`
        );

        if (!respuesta.ok) {
            throw new Error("Producto no encontrado.");
        }

        return await respuesta.json();

    } catch (error) {

        console.error(error);

        return null;

    }

},
    // ==========================================

    async obtenerQR(id) {

        try {

            const respuesta = await fetch(
                `${CONFIG.API_URL}?accion=qr&id=${encodeURIComponent(id)}`
            );

            if (!respuesta.ok) {
                throw new Error("QR no encontrado.");
            }

            return await respuesta.json();

        } catch (error) {

            console.error(error);

            return null;

        }

    },

    // ==========================================

    async obtenerInventario(id) {

        try {

            const respuesta = await fetch(
                `${CONFIG.API_URL}?accion=inventario&id=${encodeURIComponent(id)}`
            );

            if (!respuesta.ok) {
                throw new Error("Inventario no encontrado.");
            }

            return await respuesta.json();

        } catch (error) {

            console.error(error);

            return null;

        }

    },

    // ==========================================

    async obtenerPuntoVenta(codigo) {

        try {

            const respuesta = await fetch(
                `${CONFIG.API_URL}?accion=puntoVenta&codigo=${encodeURIComponent(codigo)}`
            );

            if (!respuesta.ok) {
                throw new Error("Punto de venta no encontrado.");
            }

            return await respuesta.json();

        } catch (error) {

            console.error(error);

            return null;

        }

    },

    // ==========================================

    async obtenerConfiguracion() {

        try {

            const respuesta = await fetch(
                `${CONFIG.API_URL}?accion=configuracion`
            );

            if (!respuesta.ok) {
                throw new Error("No fue posible obtener la configuración.");
            }

            return await respuesta.json();

        } catch (error) {

            console.error(error);

            return null;

        }

    },

    // ==========================================

    async operacionesPendientes() {

        const respuesta = await fetch(
            CONFIG.API_URL + "?accion=operacionesPendientes"
        );

        return await respuesta.json();

    },

    // ==========================================

    async obtenerOperacionPorPaymentId(paymentId) {

        const respuesta = await fetch(
            `${CONFIG.API_URL}?accion=operacionPorPaymentId&payment_id=${encodeURIComponent(paymentId)}`
        );

        return await respuesta.json();

    }

};