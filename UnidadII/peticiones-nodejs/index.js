//NodeJS se organiza en componentes llamados módulos.
var http = require("http"); //Require se  utiliza para importar modulos.
var url = require("url");
var fs = require("fs");

http.createServer(function(request, response){ //Request: Peticion o solicitud del cliente, Response: Respuesta o resultado que se enviara al cliente.
    console.log("Se recibio una peticion");
    var detalleURL = url.parse(request.url,true);
    if (detalleURL.pathname=="/pagina1"){
        response.writeHead(200, {"Content-Type":"text/html"}); //text/html es el tipo MIME, 200 es el codigo HTTP OK
        response.write("<html><body><h1>Pagina 1</h1>"+ detalleURL.pathname+"</body></html>");
        response.end();
    } else if ( detalleURL.pathname =="/pagina2"){
        response.writeHead(200, {"Content-Type":"text/html"}); //text/html es el tipo MIME, 200 es el codigo HTTP OK
        response.write("<html><body><h1>Pagina 2</h1>"+ detalleURL.pathname+"</body></html>");
        response.end();
    }else{
        response.writeHead(404, {"Content-Type":"text/html"}); //text/html es el tipo MIME, 200 es el codigo HTTP OK
        response.write("<html><body><h1>404 Pagina no encontrada</h1>"+ detalleURL.pathname+"</body></html>");
        response.end();
    }
}).listen(3333);

console.log("Servidor iniciado");


//npm install nodemon -g
//Ejecutar un archivo js:
// nodemon index.js