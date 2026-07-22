/* ==========================================================
   CIROLO INSUMOS
   Archivo: index.js
   Versión: 0.2.0
========================================================== */

document.addEventListener("DOMContentLoaded", iniciar);


/* ==========================================================
   Inicio
========================================================== */

async function iniciar() {

    const loader = document.getElementById("loader");
    const contenedor = document.getElementById("contenedorProductos");

    loader.style.display = "block";

    const productos = await API.obtenerProductos();

    loader.style.display = "none";

    if (!productos || productos.length === 0) {

        contenedor.innerHTML = `
            <p>No hay productos disponibles.</p>
        `;

        return;
    }

    productos.forEach(producto => {

        contenedor.appendChild(crearTarjeta(producto));

    });

}


/* ==========================================================
   Tarjeta de producto
========================================================== */

function crearTarjeta(producto) {

    const tarjeta = document.createElement("article");

    tarjeta.className = "producto";


    const imagen = obtenerImagen(producto);

    tarjeta.innerHTML = `

        <img
            src="${imagen}"
            alt="${producto.titulo}"
            loading="lazy"
        >

        <div class="producto-contenido">

            <h2>${producto.titulo}</h2>

            <div class="precio">

                ${formatearPrecio(producto.precio)}

            </div>

            <div class="descripcion">

                ${producto.descripcion || ""}

            </div>

            <a
                class="boton"
                href="producto.html?codigo=${producto.codigo}"
            >

                Ver producto

            </a>

        </div>

    `;

    return tarjeta;

}


/* ==========================================================
   Imagen
========================================================== */

function obtenerImagen(producto) {

    if (producto.foto && producto.foto !== "") {

        return producto.foto;

    }

    return "img/placeholder.png";

}


/* ==========================================================
   Precio
========================================================== */

function formatearPrecio(precio) {

    const numero = Number(precio);

    return CONFIG.MONEDA + " " + numero.toLocaleString("es-AR", {

        minimumFractionDigits: CONFIG.DECIMALES,
        maximumFractionDigits: CONFIG.DECIMALES

    });

}