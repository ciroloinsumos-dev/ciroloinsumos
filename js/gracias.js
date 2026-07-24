document.addEventListener("DOMContentLoaded",()=>{

    const parametros=new URLSearchParams(location.search);

    const op=parametros.get("op");

    document.getElementById("operacion").textContent=op;

    document.getElementById("btnInicio").onclick=()=>{

        location.href="index.html";

    };

});