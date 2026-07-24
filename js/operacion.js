document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar(){

    const parametros = new URLSearchParams(location.search);

    const op = parametros.get("op");

    const datos = await API.obtenerOperacion(op);

    document.getElementById("operacion").textContent = datos.operacion;

    document.getElementById("estado").textContent = datos.estado;

    document.getElementById("producto").textContent = datos.tituloProducto;

    document.getElementById("precio").textContent =
        CONFIG.MONEDA + " " + datos.precio;

    document.getElementById("medio").textContent = datos.medio;

    document.getElementById("taller").textContent = datos.taller;

    document.getElementById("btnEntregar").onclick = async()=>{

        if(!confirm("¿Confirmar entrega del producto?")){

            return;

        }

        const respuesta = await API.entregarOperacion(op);

        if(respuesta.ok){

            alert("Producto entregado correctamente.");

            location.href="panel.html";

        }else{

            alert("No fue posible registrar la entrega.");

        }

    };

}