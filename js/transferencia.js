document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar() {

    try {

        const parametros = new URLSearchParams(window.location.search);

        const id = parametros.get("id");

        const inventario = await API.obtenerInventario(id);

        const producto = await API.obtenerProducto(inventario.codigoProducto);

        const configuracion = await API.obtenerConfiguracion();

        foto.src = producto.foto;

        titulo.textContent = producto.titulo;

        precio.textContent = CONFIG.MONEDA + " " + producto.precio;

        alias.textContent = configuracion.alias;

        cbu.textContent = configuracion.cbu;

        titular.textContent = configuracion.titular;

        document.getElementById("loader").style.display = "none";

        document.getElementById("copiarAlias").onclick = () => copiar(configuracion.alias);

        document.getElementById("copiarCBU").onclick = () => copiar(configuracion.cbu);

        document.getElementById("btnConfirmar").onclick = async () => {

            const boton = document.getElementById("btnConfirmar");

            boton.disabled = true;

            boton.textContent = "Registrando operación...";

            try {

                const respuesta = await API.crearOperacion(id, "TRANSFERENCIA");

                if (!respuesta.ok) {

                    alert(respuesta.mensaje || "No se pudo registrar la operación.");

                    boton.disabled = false;

                    boton.textContent = "Ya realicé la transferencia";

                    return;

                }

                location.href = "gracias.html?op=" + respuesta.operacion;

            }

            catch (error) {

                console.error(error);

                alert("Ocurrió un error al registrar la operación.");

                boton.disabled = false;

                boton.textContent = "Ya realicé la transferencia";

            }

        };

    }

catch (error) {

    console.error(error);

    document.getElementById("loader").style.display = "none";

    alert(error.stack || error.message || error);

}

}

async function copiar(texto) {

    try {

        await navigator.clipboard.writeText(texto);

        mostrarMensaje("Copiado al portapapeles");

    }

    catch (error) {

        console.error(error);

        alert("No fue posible copiar el texto.");

    }

}

function mostrarMensaje(texto) {

    const mensaje = document.createElement("div");

    mensaje.className = "toast";

    mensaje.textContent = texto;

    document.body.appendChild(mensaje);

    setTimeout(() => {

        mensaje.classList.add("visible");

    }, 10);

    setTimeout(() => {

        mensaje.classList.remove("visible");

        setTimeout(() => mensaje.remove(), 300);

    }, 1800);

}