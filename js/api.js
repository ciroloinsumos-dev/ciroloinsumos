async function obtenerProducto(codigo){

    const respuesta = await fetch(

        CONFIG.API_URL +
        "?accion=producto&codigo=" +
        codigo

    );

    return await respuesta.json();

}