var express  = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();

var credenciales = {
    user:"root",
    password:"",
    port:"3306",
    host:"localhost",
    database:"bd_whatsapp"
};

app.use(express.static("public")); //Middlewares
app.use(bodyParser.json());

app.get("/obtener-usuarios", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = 'SELECT codigo_usuario, nombre_usuario, correo, url_imagen_perfil FROM tbl_usuarios';
    var usuarios = [];
    conexion.query(sql)
    .on("result", function(resultado){
        usuarios.push(resultado);
    })
    .on("end",function(){
        response.send(usuarios);
    });   
})

app.listen(3333);