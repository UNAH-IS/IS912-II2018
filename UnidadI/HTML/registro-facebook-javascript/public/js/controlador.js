//Javascript:
//-Web dinamica
/*document.write("<ul>");
for(var i=0; i<100;i++){
    document.write("<li>Opcion "+i + "</li>");
}
document.write("</ul>");
*/


function prueba(){
    //-Modificar el DOM
    document.getElementById("txt-firstname").value = "Juan";
    //Cambiar un estilo:
    //document.getElementById("txt-firstname").style.borderColor = "red";

    //Agregar una clase css:
    document.getElementById("txt-firstname").classList.add("input-error");

    document.getElementById("validacion").innerHTML = "<b>Este campo es obligatorio</b>";
}

//-Gestion de eventos
function registrar(){
    //Este era un ejemplo sin usar bootstrap
    /*if (document.getElementById("txt-firstname").value==""){
        document.getElementById("txt-firstname").classList.add("input-error");
        document.getElementById("validacion").innerHTML = "<b>Este campo es obligatorio</b>";
    }*/
    validarCampoVacio("txt-firstname");
    validarCampoVacio("txt-lastname");
    validarCampoVacio("txt-email");
    validarCampoVacio("txt-password");
    validarCampoVacio("txt-birthday");


}

function validarCampoVacio(id){
    if (document.getElementById(id).value==""){
        document.getElementById(id).classList.remove("is-valid");
        document.getElementById(id).classList.add("is-invalid");
    } else{
        document.getElementById(id).classList.remove("is-invalid");
        document.getElementById(id).classList.add("is-valid");
    }
}



//-Peticiones asincronas al servidor
