$("#slc-usuario").change(function(){
	alert("USUARIO seleccionado: " + $("#slc-usuario").val());
});

function seleccionarContacto(codigoContacto, nombreContacto){
	alert("CONTACTO seleccionado: " + codigoContacto + ", Nombre: " + nombreContacto);
}

$("#btn-enviar").click(function(){
	alert("Enviar mensaje: " + $("#txta-mensaje").val());
});



$(document).ready(function(){
	//Esta funcion se ejecuta cuando la página esta lista
	$.ajax({
		url:"/obtener-usuarios",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			for(var i=0; i<respuesta.length; i++){
				$("#slc-usuario").append('<option value="'+respuesta[i].codigo_usuario+'">'+respuesta[i].nombre_usuario+'</option>');
				$("#div-contactos").append(
					`<div class="row sideBar-body" onclick="seleccionarContacto(${respuesta[i].codigo_usuario},'${respuesta[i].nombre_usuario}');">
						<div class="col-sm-3 col-xs-3 sideBar-avatar">
						<div class="avatar-icon">
							<img src="${respuesta[i].url_imagen_perfil}">
						</div>
						</div>
						<div class="col-sm-9 col-xs-9 sideBar-main">
						<div class="row">
							<div class="col-sm-8 col-xs-8 sideBar-name">
							<span class="name-meta">${respuesta[i].nombre_usuario}</span>
							</div>
							<div class="col-sm-4 col-xs-4 pull-right sideBar-time">
							<span class="time-meta pull-right">18:18
							</span>
							</div>
						</div>
						</div>
					</div>`
				);
			}
		}
	});
});
