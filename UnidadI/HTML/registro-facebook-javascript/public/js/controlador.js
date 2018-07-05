//Javascript:
//-Web dinamica
/*document.write("<ul>");
for(var i=0; i<100;i++){
    document.write("<li>Opcion "+i + "</li>");
}
document.write("</ul>");
*/

/*
Ejemplo de objeto JSON
var persona = {
    nombre:"Pedro",
    edad:35,
    genero:"Masculino",
    telefono:666789,
    fechaNacimiento:{
        dia:11,
        mes:"Enero",
        anio:1999
    }
};

persona.paisNacimiento = "Honduras";

console.log(persona);
console.log("Nombre: " + persona.nombre);
console.log("Mes nacimiento: " + persona.fechaNacimiento.mes);*/


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

    var usuario = {};
    usuario.firstname =  document.getElementById("txt-firstname").value;
    usuario.lastname =  document.getElementById("txt-lastname").value;
    usuario.email =  document.getElementById("txt-email").value;
    usuario.password =  document.getElementById("txt-password").value;
    usuario.birthday =  document.getElementById("txt-birthday").value;
    
    console.log(usuario);
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

function validarCorreo(etiqueta) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(etiqueta.value)){
        etiqueta.classList.remove("is-invalid");
        etiqueta.classList.add("is-valid");
    } else{
        etiqueta.classList.remove("is-valid");
        etiqueta.classList.add("is-invalid");
    }   
}



//-Peticiones asincronas al servidor
