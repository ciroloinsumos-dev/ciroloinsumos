document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar(){

    try{

        const parametros = new URLSearchParams(window.location.search);

        const id = parametros.get("id");

        const inventario = await API.obtenerInventario(id);

        const producto = await API.obtenerProducto(inventario.codigoProducto);

        const taller = await API.obtenerTaller(inventario.codigoTaller);

        foto.src = producto.foto;

        titulo.textContent = producto.titulo;

        precio.textContent = CONFIG.MONEDA + " " + producto.precio;

        alias.textContent = taller.alias;

        cbu.textContent = taller.cbu;

        titular.textContent = taller.titular;

        document.getElementById("loader").style.display="none";

        document.getElementById("copiarAlias").onclick=()=>copiar(taller.alias);

        document.getElementById("copiarCBU").onclick=()=>copiar(taller.cbu);

        document.getElementById("btnConfirmar").onclick = async () => {

    const boton = document.getElementById("btnConfirmar");

    boton.disabled = true;
    boton.textContent = "Registrando operación...";

    try {

        const respuesta = await API.crearOperacion(id, "TRANSFERENCIA");

        if (!respuesta.ok) {

            alert("No se pudo registrar la operación.");

            boton.disabled = false;
            boton.textContent = "Ya realicé la transferencia";

            return;

        }

        location.href = "gracias.html?op=" + respuesta.operacion;

    }

    catch(error){

        console.error(error);

        alert("Ocurrió un error.");

        boton.disabled = false;
        boton.textContent = "Ya realicé la transferencia";

    }

};

    }

    catch(e){

        console.error(e);

        alert("Error al cargar los datos.");

    }

}

function copiar(texto){

    navigator.clipboard.writeText(texto);

    alert("Copiado al portapapeles");

}