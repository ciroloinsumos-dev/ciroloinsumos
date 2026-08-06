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
        // QR
        // ==========================

        const qr = await API.obtenerQR(id);

        if (!qr || qr.error) {

            ocultarLoader();
            alert("QR no encontrado.");
            return;

        }

        // ==========================
        // INVENTARIO
        // ==========================

        const inventario = await API.obtenerInventario(qr.inventario);

        if (!inventario || inventario.error) {

            ocultarLoader();
            alert("Inventario no encontrado.");
            return;

        }

        // ==========================
        // PRODUCTO
        // ==========================

        console.log("ID recibido:", id);

        const producto = await API.obtenerProducto(qr.producto);

        const producto = await API.obtenerProducto(id);

        console.log("Producto recibido:", producto);

        if (!producto || producto.error) {

            ocultarLoader();
            alert("Producto no encontrado.");
            return;

        }

        // ==========================
        // TALLER
        // ==========================

        const taller = await API.obtenerTaller(qr.taller);

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
        document.getElementById("precio").textContent =
            CONFIG.MONEDA + " " + Number(producto.precio).toLocaleString("es-AR");
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

        if (btnMP) {

            btnMP.addEventListener("click", async (e) => {

                e.preventDefault();

                try {

                    btnMP.disabled = true;
                    btnMP.textContent = "Conectando con Mercado Pago...";

                    const pago = await API.crearPreferencia(id);

                    if (!pago.init_point) {

                        throw new Error("No fue posible crear el pago.");

                    }

                    window.location.href = pago.init_point;

                } catch (error) {

                    console.error(error);

                    alert("No fue posible conectar con Mercado Pago.");

                    btnMP.disabled = false;
                    btnMP.textContent = "Mercado Pago";

                }

            });

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

        console.log("QR:", qr);
        console.log("Inventario:", inventario);
        console.log("Producto:", producto);
        console.log("Taller:", taller);

    } catch (error) {

        console.error(error);

        ocultarLoader();

        alert("Ocurrió un error al cargar el producto.");

    }

}

//==================================

function ocultarLoader() {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.display = "none";

    }

}