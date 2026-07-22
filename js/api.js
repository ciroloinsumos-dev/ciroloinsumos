/* ==========================================================
   CIROLO INSUMOS
   Archivo: api.js
   Versión: 0.2.0
========================================================== */

const API = {

    async obtenerProductos() {

        try {

            const respuesta = await fetch(`${CONFIG.API_URL}?accion=productos`);

            if (!respuesta.ok) {
                throw new Error("No fue posible conectar con la API.");
            }

            const datos = await respuesta.json();

            return datos;

        } catch (error) {

            console.error(error);

            return [];

        }

    },

    async obtenerProducto(codigo) {

        try {

            const respuesta = await fetch(`${CONFIG.API_URL}?accion=producto&codigo=${encodeURIComponent(codigo)}`);

            if (!respuesta.ok) {
                throw new Error("Producto no encontrado.");
            }

            const datos = await respuesta.json();

            return datos;

        } catch (error) {

            console.error(error);

            return null;

        }

    }

};