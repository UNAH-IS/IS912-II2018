var express = require("express");
var session = require("express-session");
var app = express();

app.use(session({secret:"ASDFSDF$%%aasdera", resave: true, saveUninitialized:true}));

app.get("/",function(request, response){
    response.send("Este es un ejemplo para variables de sesion");
});

app.get("/guardar-variable-sesion/:usuario",function(request, response){
    request.session.usuario = request.params.usuario;
    response.send("Se guardo la sesion");
});

app.get("/obtener-variable-sesion",function(request, response){
    response.send("La variable de session guardada es: " + request.session.usuario);
});

app.get("/destruir-sesion",function(request, response){
    request.session.destroy();
    response.send("Sesion eliminada");
});

app.listen(3333);