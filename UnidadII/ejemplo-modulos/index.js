var http = require("http");
var modulo1 = require("./modulo1");

http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(modulo1.obtenerMensajePersonalizado("Juan"));
    response.end();
}).listen(3333);

console.log("Esperando peticiones");

