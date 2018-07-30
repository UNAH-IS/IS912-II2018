$('#btn-login').click(function(){
    $("#btn-login").attr("disabled", true);
    var parametros = "usuario="+$("#usuario").val()+"&"+"password="+$("#password").val();
    console.log("Se enviara esta informacion al servidor: " + parametros);
    //Funcion de jquery para hacer peticiones asincronas con AJAX
    $.ajax({
        url:"/procesar",
        method:"get", 
        data:parametros, //URLEncoded
        dataType:"json", //Tipo de dato de la respuesta del servidor
        success: function(response){//Funcion que se ejecutara cuando el servidor envie la respuesta
            $("#btn-login").attr("disabled", false);
            console.log(response);
            $("#respuesta").append(response);
            alert(response.usuario);
        }
    });
});