document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar() {

    const parametros = new URLSearchParams(window.location.search);

    const id = parametros.get("id");

    if (!id) {

        alert("No se indicó un producto.");

        return;

    }

    const inventario = await API.obtenerInventario(id);

    if (!inventario || inventario.error) {

        alert("Producto no encontrado.");

        return;

    }

    const producto = await API.obtenerProducto(inventario.codigoProducto);

    if (!producto || producto.error) {

        alert("Producto no encontrado.");

        return;

    }

    const taller = await API.obtenerTaller(inventario.codigoTaller);

    document.getElementById("titulo").textContent = producto.titulo;
    document.getElementById("descripcion").textContent = producto.descripcion;
    document.getElementById("categoria").textContent = producto.categoria;
    document.getElementById("precio").textContent = "$ " + producto.precio;
    document.getElementById("peso").textContent = producto.peso;
    document.getElementById("marca").textContent = producto.marca;

    if (document.getElementById("taller")) {
        document.getElementById("taller").textContent = taller.nombre;
    }

    console.log({
        inventario,
        producto,
        taller
    });

}