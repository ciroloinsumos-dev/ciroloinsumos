document.addEventListener("DOMContentLoaded", iniciar);

// ==========================================================
// LOADER
// ==========================================================

let intervaloLoader = null;

function iniciarMensajesLoader() {

    const mensajes = [
        "Buscando información...",
        "Cargando producto...",
        "Cargando fotografía...",
        "Cargando punto de venta...",
        "Preparando medios de pago..."
    ];

    let posicion = 0;

    const texto = document.getElementById("loaderTexto");

    if (!texto) return;

    texto.textContent = mensajes[0];

    intervaloLoader = setInterval(() => {

        posicion++;

        if (posicion >= mensajes.length) {
            posicion = 0;
        }

        texto.textContent = mensajes[posicion];

    }, 2500);
}

function detenerMensajesLoader() {

    if (intervaloLoader) {

        clearInterval(intervaloLoader);

        intervaloLoader = null;

    }
}

function cambiarTextoLoader(texto) {

    const loaderTexto = document.getElementById("loaderTexto");

    if (loaderTexto) {

        loaderTexto.textContent = texto;

    }
}

// ==========================================================
// INICIAR
// ==========================================================

async function iniciar() {

    iniciarMensajesLoader();

    try {

        const parametros = new URLSearchParams(window.location.search);
        const id = parametros.get("id");

        if (!id) {

            detenerMensajesLoader();
            ocultarLoader();

            alert("No se indicó un producto.");

            return;

        }

        // ==========================
        // QR
        // ==========================

        const qr = await API.obtenerQR(id);

        if (!qr || qr.error) {

            detenerMensajesLoader();
            ocultarLoader();

            alert("QR no encontrado.");

            return;

        }

        // ==========================
        // INVENTARIO
        // ==========================

        const inventario = await API.obtenerInventario(qr.inventario);

        if (!inventario || inventario.error) {

            detenerMensajesLoader();
            ocultarLoader();

            alert("Inventario no encontrado.");

            return;

        }

        // ==========================
        // PRODUCTO
        // ==========================

        const producto = await API.obtenerProducto(qr.inventario);

        if (!producto || producto.error) {

            detenerMensajesLoader();
            ocultarLoader();

            alert("Producto no encontrado.");

            return;

        }

        // ==========================
        // PUNTO DE VENTA
        // ==========================

        const puntoVenta = await API.obtenerPuntoVenta(qr.taller);

        if (!puntoVenta || puntoVenta.error) {

            detenerMensajesLoader();
            ocultarLoader();

            alert("Punto de venta no encontrado.");

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

        document.getElementById("descripcion").textContent =
            producto.descripcion;

        document.getElementById("categoria").textContent =
            producto.categoria;

        document.getElementById("precio").textContent =
            CONFIG.MONEDA + " " +
            Number(producto.precio).toLocaleString("es-AR");

        document.getElementById("peso").textContent =
            producto.peso;

        document.getElementById("marca").textContent =
            producto.marca;

        // ==========================
        // PUNTO DE VENTA
        // ==========================

        const nombrePuntoVenta =
            document.getElementById("puntoVenta");

        if (nombrePuntoVenta) {

            nombrePuntoVenta.textContent =
                puntoVenta.nombre;

        }

        // ==========================
        // BOTÓN MERCADO PAGO
        // ==========================

        const btnMP =
            document.getElementById("btnMP");

        if (btnMP) {

            btnMP.addEventListener("click", async (e) => {

                e.preventDefault();

                try {

                    btnMP.disabled = true;

                    btnMP.textContent =
                        "Conectando con Mercado Pago...";

                    const pago =
                        await API.crearPreferencia(id);

                    const urlPago =
                        pago.init_point ||
                        pago.sandbox_init_point;

                    if (!urlPago) {

                        throw new Error(
                            "No fue posible crear el pago."
                        );

                    }

                    window.location.href = urlPago;

                } catch (error) {

                    console.error(error);

                    alert(
                        "No fue posible conectar con Mercado Pago."
                    );

                    btnMP.disabled = false;

                    btnMP.textContent =
                        "Mercado Pago";

                }

            });

        }

        // ==========================
        // BOTÓN TRANSFERENCIA
        // ==========================

        const btnTransferencia =
            document.getElementById("btnTransferencia");

        if (btnTransferencia) {

            btnTransferencia.addEventListener("click", () => {

                window.location.href =
                    `transferencia.html?id=${id}`;

            });

        }

        // ==========================
        // FINALIZAR CARGA
        // ==========================

        detenerMensajesLoader();

        cambiarTextoLoader("Producto listo");

        setTimeout(() => {

            ocultarLoader();

        }, 300);

        // ==========================
        // CONSOLA
        // ==========================

        console.log("QR:", qr);
        console.log("Inventario:", inventario);
        console.log("Producto:", producto);
        console.log("Punto de Venta:", puntoVenta);

    } catch (error) {

        console.error(error);

        detenerMensajesLoader();

        ocultarLoader();

        alert(
            "Ocurrió un error al cargar el producto."
        );

    }

}

// ==========================================================
// OCULTAR LOADER
// ==========================================================

function ocultarLoader() {

    const loader =
        document.getElementById("loader");

    if (loader) {

        loader.style.display = "none";

    }

}