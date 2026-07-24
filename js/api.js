const API = {
    
    async crearOperacion(id, medio) {

    const url =
        CONFIG.API +
        "?accion=crearOperacion" +
        "&id=" + encodeURIComponent(id) +
        "&medio=" + encodeURIComponent(medio);

    const respuesta = await fetch(url);

    return await respuesta.json();

},
    
    async obtenerProductos() {

        try {

            const respuesta = await fetch(`${CONFIG.API_URL}?accion=productos`);

            if (!respuesta.ok) {
                throw new Error("No fue posible conectar con la API.");
            }

            return await respuesta.json();

        } catch (error) {

            console.error(error);

            return [];

        }

    },


    async obtenerProducto(codigo) {

        try {

            const respuesta = await fetch(
                `${CONFIG.API_URL}?accion=producto&codigo=${encodeURIComponent(codigo)}`
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


    async obtenerTaller(codigo) {

        try {

            const respuesta = await fetch(
                `${CONFIG.API_URL}?accion=taller&codigo=${encodeURIComponent(codigo)}`
            );

            if (!respuesta.ok) {
                throw new Error("Taller no encontrado.");
            }

            return await respuesta.json();

        } catch (error) {

            console.error(error);

            return null;

        }

    }

};