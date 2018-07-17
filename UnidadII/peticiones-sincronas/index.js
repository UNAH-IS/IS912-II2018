//NodeJS se organiza en componentes llamados módulos.
var http = require("http"); //Require se  utiliza para importar modulos.
var url = require("url");
var fs = require("fs");

http.createServer(function(request, response){ //Request: Peticion o solicitud del cliente, Response: Respuesta o resultado que se enviara al cliente.
    console.log("Se recibio una peticion");
    var detalleURL = url.parse(request.url,true);
    if (detalleURL.pathname=="/formulario"){
        fs.readFile("./formulario.html", function(err, data){
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data);
            response.end();
        });
    }else if (detalleURL.pathname=="/procesar"){
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write("<html><body>Usuario ingresado" + detalleURL.query.usuario+ "</body></html>");
        
        response.end();
    }else{
        response.writeHead(404,{"Content-Type":"text/html"});
        response.write("<html><body>404</body></html>");
        response.end();
    }
}).listen(3333);

console.log("Servidor iniciado");