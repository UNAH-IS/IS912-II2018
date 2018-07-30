var express = require("express");
var bodyParser= require("body-parser");
var app = express();


//use se usa para componentes de nodejs llamados middlewares
app.use(express.static("public"));  //middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));//Para poder obtener archivos enviados via post.
/*app.metodo(url,function(request, response){
    
});*/

app.get("/procesar",function(request, response){
    //setTimeout(function() {
    //response.send("<b>Usuario:</b> " + request.query.usuario); //Acceder a parametro en POST
    //}, 3000); 

    response.send(request.query);
});

app.listen(3333);