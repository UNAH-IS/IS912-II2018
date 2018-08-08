$("#slc-usuario").change(function(){
	cargarConversacion();
});

function seleccionarContacto(codigoContacto, nombreContacto, urlImagen){
	$("#usuario-receptor").val(codigoContacto);
	$("#nombre-contacto").html(nombreContacto);
	$("#imagen-contacto").attr("src",urlImagen);
	cargarConversacion();
}

function cargarConversacion(){
	console.log("Enviar al servidor: Emisor: " + $("#slc-usuario").val() + ", Receptor: " + $("#usuario-receptor").val());
	$.ajax({
		url:"/obtener-conversacion",
		method:"GET",
		data:"emisor="+$("#slc-usuario").val() + "&" + "receptor="+$("#usuario-receptor").val(),
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			$("#conversation").html("");
			for(var i=0; i<respuesta.length;i++){
				var cssClass=""; //sender
				if ($("#slc-usuario").val() == respuesta[i].codigo_usuario_emisor)
					cssClass="sender"; 
				else
					cssClass="receiver"; 
				$("#conversation").append(
					`<div class="row message-body">
						<div class="col-sm-12 message-main-${cssClass}">
						<div class="${cssClass}">
							<div class="message-text">
							${respuesta[i].mensaje}
							</div>
							<span class="message-time pull-right">
							18:18
							</span>
						</div>
						</div>
					</div>`
				);
			}
		}
	});
}

$("#btn-enviar").click(function(){
	//alert("Enviar mensaje: " + $("#txta-mensaje").val());
	var parametros = "emisor="+$("#slc-usuario").val() + "&" + 
					 "receptor="+$("#usuario-receptor").val() + "&"+
					 "mensaje="+$("#txta-mensaje").val();
	$.ajax({
		url:"/enviar-mensaje",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
				$("#conversation").append(
					`<div class="row message-body">
						<div class="col-sm-12 message-main-sender">
						<div class="sender">
							<div class="message-text">
							${$("#txta-mensaje").val()}
							</div>
							<span class="message-time pull-right">
							18:18
							</span>
						</div>
						</div>
					</div>`
				);
			}
			console.log(respuesta);
		}
	});
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
					`<div class="row sideBar-body" onclick="seleccionarContacto(${respuesta[i].codigo_usuario},'${respuesta[i].nombre_usuario}','${respuesta[i].url_imagen_perfil}');">
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
