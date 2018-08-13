var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();

app.use(cookieParser());//Middleware para parsera las cookies en el JSON request.cookies

app.get("/",function(request, response){
    response.send("Este es un ejemplo para cookies");
});

app.get("/guardar-cookie",function(request, response){
    response.cookie("usuario","jperez");
    response.send("Se guardo la cookie en el cliente");
});

app.get("/obtener-cookie",function(request, response){
    var cookieGuardada = request.cookies.usuario;
    response.send("En el cliente esta guardad la cookie usuario con el valor: " + cookieGuardada);
});

app.listen(3333);