document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar() {

    try {

        const parametros = new URLSearchParams(window.location.search);

        const id = parametros.get("id");

        if (!id) {

            alert("No se indicó un producto.");

            return;

        }

        // Buscar el registro de inventario
        const inventario = await API.obtenerInventario(id);

        if (!inventario || inventario.error) {

            alert("Inventario no encontrado.");

            return;

        }

        // Buscar el producto
        const producto = await API.obtenerProducto(inventario.codigoProducto);

        if (!producto || producto.error) {

            alert("Producto no encontrado.");

            return;

        }

        // Buscar el taller
        const taller = await API.obtenerTaller(inventario.codigoTaller);

        if (!taller || taller.error) {

            alert("Taller no encontrado.");

            return;

        }

        // ===== Datos del producto =====

        document.getElementById("titulo").textContent = producto.titulo;
        document.getElementById("descripcion").textContent = producto.descripcion;
        document.getElementById("categoria").textContent = producto.categoria;
        document.getElementById("precio").textContent = CONFIG.MONEDA + " " + producto.precio;
        document.getElementById("peso").textContent = producto.peso;
        document.getElementById("marca").textContent = producto.marca;

        // ===== Foto =====

        const foto = document.getElementById("foto");

        if (foto && producto.foto) {

            foto.src = producto.foto;
            foto.alt = producto.titulo;

        }

        // ===== Taller =====

        const nombreTaller = document.getElementById("taller");

        if (nombreTaller) {

            nombreTaller.textContent = taller.nombre;

        }

        // ===== Botón Mercado Pago =====

        const btnMP = document.getElementById("btnMP");

        if (btnMP && taller.linkMP) {

            btnMP.href = taller.linkMP;

        }

        // ===== Consola =====

        console.log("Inventario:", inventario);
        console.log("Producto:", producto);
        console.log("Taller:", taller);

    } catch (error) {

        console.error(error);

        alert("Ocurrió un error al cargar el producto.");

    }

}