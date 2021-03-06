var db; //variable global

(function(){
    if (!('indexedDB' in window)){
        console.err("El navegador no soporta indexedDB");
        return;
    }

    var solicitud = window.indexedDB.open("facebook", 1);//Parametros: nombre, version. La version debe ser entero
    
    //Se ejecutara en caso de que pueda abrir la BD sin problemas
    solicitud.onsuccess = function(evento){
        console.log("Se abrio la base de datos");
        db = solicitud.result;
        //Leer la informacion del objectstore e imprimirla en la tabla html
        llenarTablaUsuarios();
        llenarListaPosts();
        
    };
    

    //Se ejecutar en caso no se pueda abrir la base de datos
    solicitud.onerror = function(evento){
        console.err("No se pudo abrir la base datos");
    };

    //Se ejecutara cuando NO exista la base de datos o se necesite actualizar
    solicitud.onupgradeneeded = function(evento){
        console.log("La base de datos se creara");
        db = evento.target.result; //Obteniendo la refencia la base de datos creada (facebook)
        var objectStoreUsuarios = db.createObjectStore("usuarios", {keyPath: "codigo", autoIncrement: true});
        db.createObjectStore("posts", {keyPath: "codigo", autoIncrement: true});

        objectStoreUsuarios.transaction.oncomplete = function(evento){
            console.log("El object store de usuarios se creo con exito");
        }

        objectStoreUsuarios.transaction.onerror = function(evento){
            console.log("Error al crear el object store de usuarios");
        }
        //En este punto se debe crear la estructura de la base de datos
        //Es necesario crear almacenes de objetos en la base de datos (Object Store)
    }
    
})();

/*
Esto:
(function(){

})();

es equivalente a:

function nombreFuncion(){
}
nombreFuncion();
*/ 

var mostrarMensaje = function(){
    console.log("Hola mundo");
    return 5;
}

function ejecutarFuncion(a){
    a();
}

//ejecutarFuncion(mostrarMensaje); //Aqui se envia la funcion completa
//ejecutarFuncion(mostrarMensaje()); //Esto es incorrecto ya que se enviaria el resultado de retorno de la funcion no la funcion
/*ejecutarFuncion(function(){
    console.log("ESta es una nueva funcion la cual no tiene nombre y se enviara de parametro a la funcion ejecutarFuncion");
});*/

/*
La definicion de ambas funciones es equivalente

var nombreFuncion = function(){

}
function nombreFuncion(){

}

*/

//-Gestion de eventos
function registrar(){
    if (
        validarCampoVacio("txt-firstname") &&
        validarCampoVacio("txt-lastname") &&
        validarCampoVacio("txt-email") &&
        validarCampoVacio("txt-password") &&
        validarCampoVacio("txt-birthday")
    ){
        var usuario = {};
        usuario.firstname =  document.getElementById("txt-firstname").value;
        usuario.lastname =  document.getElementById("txt-lastname").value;
        usuario.email =  document.getElementById("txt-email").value;
        usuario.password =  document.getElementById("txt-password").value;
        usuario.birthday =  document.getElementById("txt-birthday").value;
        
        ///Guardar informacion en el objectstore de usuarios de la base de datos de facebook
        var transaccion = db.transaction(["usuarios"],"readwrite");///readwrite: Escritura/lectura, readonly: Solo lectura
        var objectStoreUsuarios = transaccion.objectStore("usuarios");
        var solicitud = objectStoreUsuarios.add(usuario);
        solicitud.onsuccess = function(evento){
            console.log("Se agrego el usuario correctamente");
            llenarTablaUsuarios();
        }

        solicitud.onerror = function(evento){
            console.log("Ocurrio un error al guardar");
        }

        console.log(usuario);
    }
}


function registrarPost(){
    if (
        validarCampoVacio("slc-usuario") &&
        validarCampoVacio("txt-post") &&
        validarCampoVacio("txt-fecha") 
    ){
        var post = {};
        post.usuario =  document.getElementById("slc-usuario").value;
        post.post =  document.getElementById("txt-post").value;
        post.fecha =  document.getElementById("txt-fecha").value;
        
        ///Guardar informacion en el objectstore de usuarios de la base de datos de facebook
        var transaccion = db.transaction(["posts"],"readwrite");///readwrite: Escritura/lectura, readonly: Solo lectura
        var objectStorePosts = transaccion.objectStore("posts");
        var solicitud = objectStorePosts.add(post);
        solicitud.onsuccess = function(evento){
            console.log("Se agrego el post correctamente");
            llenarListaPosts();
            $('#postsModal').modal('hide');
        }

        solicitud.onerror = function(evento){
            console.log("Ocurrio un error al guardar");
        }
        console.log(post);
    }
}

function validarCampoVacio(id){
    if (document.getElementById(id).value==""){
        document.getElementById(id).classList.remove("is-valid");
        document.getElementById(id).classList.add("is-invalid");
        return false;
    } else{
        document.getElementById(id).classList.remove("is-invalid");
        document.getElementById(id).classList.add("is-valid");
        return true;
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


function llenarTablaUsuarios(){
    if (document.getElementById("tabla-usuarios")!=null)
        document.getElementById("tabla-usuarios").innerHTML = "<tr><th>Firstname</th><th>Lastname</th><th>Email</th></tr>";
    //Leer el objectstore de usuarios para imprimir la informacion, debe ser en este punto porque esta funcion se ejecuta si se abrio la BD correctamente
    var transaccion = db.transaction(["usuarios"],"readonly");///readwrite: Escritura/lectura, readonly: Solo lectura
    var objectStoreUsuarios = transaccion.objectStore("usuarios");
    var cursor = objectStoreUsuarios.openCursor();
    cursor.onsuccess = function(evento){
        //Se ejecuta por cada objeto del objecstore
        if(evento.target.result){
            console.log(evento.target.result.value);
            if (document.getElementById("tabla-usuarios") !=null)
                document.getElementById("tabla-usuarios").innerHTML += 
                        "<tr><td>"+ evento.target.result.value.firstname
                        +"</td><td>"+ evento.target.result.value.lastname
                        +"</td><td>"+ evento.target.result.value.email
                        +"</td></tr>";
            else if (document.getElementById("slc-usuario")!=null){
                var nombre = evento.target.result.value.firstname + " " + evento.target.result.value.lastname;
                document.getElementById("slc-usuario").innerHTML += '<option value="'+nombre+'">'+ nombre +'</option>';
            }

            evento.target.result.continue();
        }
    }
}


function llenarListaPosts(){
    document.getElementById("lista-posts").innerHTML="";

    //Leer el objectstore de usuarios para imprimir la informacion, debe ser en este punto porque esta funcion se ejecuta si se abrio la BD correctamente
    var transaccion = db.transaction(["posts"],"readonly");///readwrite: Escritura/lectura, readonly: Solo lectura
    var objectStorePosts = transaccion.objectStore("posts");
    var cursor = objectStorePosts.openCursor();
    cursor.onsuccess = function(evento){
        //Se ejecuta por cada objeto del objecstore
        if(evento.target.result){
            console.log(evento.target.result.value);
            var post = evento.target.result.value;
            if (document.getElementById("lista-posts") !=null)
                document.getElementById("lista-posts").innerHTML += 
                        '<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">'+
                        '<div class="post"><img src="img/profile.jpg" class="rounded-circle img-thumbnail">'+
                        '<b>'+post.usuario+'</b><small class="text-muted">'+post.fecha+'</small>'+
                        '<hr>'+post.post+'<br><button type="button" onclick="eliminarPost('+post.codigo+')" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button></div></div>';
 
            evento.target.result.continue();
        }
    }
}


function eliminarPost(codigoPost){
    console.log("Eliminar post con codigo: " + codigoPost);
        var solicitud = 
            db.transaction(["posts"],"readwrite")
            .objectStore("posts")
            .delete(codigoPost);
            
        solicitud.onsuccess = function(evento){
            console.log("Se elimino el post con codigo: " + codigoPost);
            llenarListaPosts();
        }
}