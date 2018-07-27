var express = require("express");
var bodyParser= require("body-parser");
var app = express();


//use se usa para componentes de nodejs llamados middlewares
app.use(express.static("public"));  //middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));//Para poder obtener archivos enviados via post.
/*app.metodo(url,function(request, response){
    
});*/


app.get("/",function(request, response){
    response.send("Hola mundo");
});

app.get("/procesar",function(request, response){
    response.send("Usuario: " + request.query.usuario); //Acceder a parametro en GET
});

app.post("/procesar",function(request, response){
    response.send("Usuario: " + request.body.usuario); //Acceder a parametro en POST
});

app.get("/obtener-usuario/:codigo",function(request, response){
    response.send("Obtener la informacion del usuario con el codigo: " +request.params.codigo);  //Parametros tipo express
});

app.get("/ab*cd",function(request, response){
    response.send("La peticion cumple con el patron ab*cd");
});

app.listen(3333);