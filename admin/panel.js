document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar(){

    const operaciones = await API.operacionesPendientes();

    const lista = document.getElementById("lista");

    operaciones.forEach(op=>{

        lista.innerHTML += `

        <div class="card">

            <h2>${op.operacion}</h2>

            <p><strong>Producto:</strong> ${op.tituloProducto}</p>

            <p><strong>Taller:</strong> ${op.nombrePuntoVenta}</p>

            <p><strong>Precio:</strong> $${op.precio}</p>

            <p><strong>Medio:</strong> ${op.medio}</p>

            <button onclick="ver('${op.operacion}')">

                Ver operación

            </button>

        </div>

        `;

    });

}

function ver(op){

    location.href="operacion.html?op="+op;

}