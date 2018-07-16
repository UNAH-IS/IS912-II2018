//NodeJS se organiza en componentes llamados módulos.
var http = require("http"); //Require se  utiliza para importar modulos.

http.createServer(function(request, response){ //Request: Peticion o solicitud del cliente, Response: Respuesta o resultado que se enviara al cliente.
    console.log("Se recibio una peticion");
    response.writeHead(200, {"Content-Type":"text/html"}); //text/html es el tipo MIME, 200 es el codigo HTTP OK
    response.write("<html><body><h1>Hola mundo</h1></body></html>");
    response.end();
}).listen(3333);

console.log("Servidor iniciado");