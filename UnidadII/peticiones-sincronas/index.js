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
        var archivo = fs.createWriteStream("usuarios.json", {'flags': 'a'});//a: Append
        archivo.once("open", function(x){
            archivo.write(JSON.stringify(detalleURL.query)+"\n");
            archivo.end();

            response.writeHead(200,{"Content-Type":"text/html"});
            response.write("<html><body>Se guardo el registro</body></html>");        
            response.end();
        });
        
    }else{
        response.writeHead(404,{"Content-Type":"text/html"});
        response.write("<html><body>404</body></html>");
        response.end();
    }
}).listen(3333);

console.log("Servidor iniciado");