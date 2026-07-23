document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar() {

    try {

        const parametros = new URLSearchParams(window.location.search);

        const id = parametros.get("id");

        if (!id) {

            ocultarLoader();

            alert("No se indicó un producto.");

            return;

        }

        // ==========================
        // INVENTARIO
        // ==========================

        const inventario = await API.obtenerInventario(id);

        if (!inventario || inventario.error) {

            ocultarLoader();

            alert("Inventario no encontrado.");

            return;

        }

        // ==========================
        // PRODUCTO
        // ==========================

        const producto = await API.obtenerProducto(inventario.codigoProducto);

        if (!producto || producto.error) {

            ocultarLoader();

            alert("Producto no encontrado.");

            return;

        }

        // ==========================
        // TALLER
        // ==========================

        const taller = await API.obtenerTaller(inventario.codigoTaller);

        if (!taller || taller.error) {

            ocultarLoader();

            alert("Taller no encontrado.");

            return;

        }

        // ==========================
        // FOTO
        // ==========================

        const foto = document.getElementById("foto");

        if (foto && producto.foto) {

            foto.src = producto.foto;
            foto.alt = producto.titulo;

        }

        // ==========================
        // DATOS DEL PRODUCTO
        // ==========================

        document.getElementById("titulo").textContent = producto.titulo;
        document.getElementById("descripcion").textContent = producto.descripcion;
        document.getElementById("categoria").textContent = producto.categoria;
        document.getElementById("precio").textContent = CONFIG.MONEDA + " " + producto.precio;
        document.getElementById("peso").textContent = producto.peso;
        document.getElementById("marca").textContent = producto.marca;

        // ==========================
        // TALLER
        // ==========================

        const nombreTaller = document.getElementById("taller");

        if (nombreTaller) {

            nombreTaller.textContent = taller.nombre;

        }

        // ==========================
        // BOTÓN MERCADO PAGO
        // ==========================

        const btnMP = document.getElementById("btnMP");

        if (btnMP && taller.linkMP) {

            btnMP.href = taller.linkMP;

        }

        // ==========================
        // BOTÓN TRANSFERENCIA
        // ==========================

        const btnTransferencia = document.getElementById("btnTransferencia");

        if (btnTransferencia) {

            btnTransferencia.addEventListener("click", () => {

                window.location.href = `transferencia.html?id=${id}`;

            });

        }

        // ==========================
        // OCULTAR LOADER
        // ==========================

        ocultarLoader();

        // ==========================
        // DEBUG
        // ==========================

        console.log("Inventario:", inventario);
        console.log("Producto:", producto);
        console.log("Taller:", taller);

    }

    catch (error) {

        console.error(error);

        ocultarLoader();

        alert("Ocurrió un error al cargar el producto.");

    }

}

//==================================

function ocultarLoader(){

    const loader = document.getElementById("loader");

    if(loader){

        loader.style.display = "none";

    }

}