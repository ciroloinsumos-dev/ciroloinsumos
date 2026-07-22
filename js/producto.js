document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar(){

    const parametros = new URLSearchParams(window.location.search);

    const codigo = parametros.get("codigo");

    if(!codigo){

        alert("No se indicó un código.");

        return;

    }

    const producto = await obtenerProducto(codigo);

    console.log(producto);

    document.getElementById("titulo").textContent=producto.titulo;

    document.getElementById("descripcion").textContent=producto.descripcion;

    document.getElementById("categoria").textContent=producto.categoria;

    document.getElementById("precio").textContent="$ "+producto.precio;

    document.getElementById("peso").textContent=producto.peso;

    document.getElementById("marca").textContent=producto.marca;

}