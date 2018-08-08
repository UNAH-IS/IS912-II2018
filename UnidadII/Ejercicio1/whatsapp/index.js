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
app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.urlencoded({extended:true}));


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
});

app.get("/obtener-conversacion",function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql =   `SELECT a.*, b.nombre_usuario AS nombre_usuario_emisor,
                    c.nombre_usuario AS nombre_usuario_receptor
                FROM tbl_mensajes a
                INNER JOIN tbl_usuarios b
                on (a.codigo_usuario_emisor = b.codigo_usuario)
                INNER JOIN tbl_usuarios c
                on (a.codigo_usuario_receptor = c.codigo_usuario)
                WHERE (codigo_usuario_emisor = ? AND codigo_usuario_receptor = ?)
                OR (codigo_usuario_emisor = ?  AND codigo_usuario_receptor = ?)`;
    var conversacion = [];
    conexion.query(sql, 
                    [
                        request.query.emisor,
                        request.query.receptor,
                        request.query.receptor,
                        request.query.emisor
                    ])
    .on("result", function(resultado){
        conversacion.push(resultado);
    })
    .on("end",function(){
        response.send(conversacion);
    });   
});

app.post("/enviar-mensaje", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = 'INSERT INTO tbl_mensajes(codigo_usuario_emisor, codigo_usuario_receptor, mensaje, hora_mensaje) VALUES (?,?,?,?)';
    
    conexion.query(
        sql,
        [request.body.emisor, request.body.receptor, request.body.mensaje,"66:66"],
        function(err, result){
            if (err) throw err;
            response.send(result);
        }
    ); 
});

app.listen(3333);