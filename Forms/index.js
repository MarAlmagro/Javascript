"use strict";
 
// Código hexadecimal color verde personalizado
//let verde = "#3cbd28"
let verde = "#199e05"
// Código hexadecimal color rojo personalizado
let rojo  = "#CC0000"

// Valor true si alguno de los datos introducidos en el
// formulario no es válido y false en otro caso
let hayError = false;
let arrayCookies = [];
// Mensajes de error
let msjErrorPassword = "Password debe tener entre 4 y 9 letras o números";
let msjErrorCondiciones = "Debe aceptar las condiciones";
let msjErrorAficiones = "Marcar un mínimo de 2 aficiones";
let msjErrorVacio = "No puede estar vacío";
let msjErrorDatosFormulario = "Por favor, verifique campos erróneos";
let msjErrorCheckPassword  = "Passwords no coinciden";
let msjErrorPasswordOriginal = "Primero debe verificar el valor del campo Password";
let msjErrorDni = "DNI debe ser entre 1 y 99999999 seguido de una letra";
let msjErrorEmail = "Sólo letras, formato mail@example.com";
let msjErrorUsuario = "Admite entre 2 y 25 letras o números";
let msjErrorAddAficion = "Debe indicar el nombre de la afición";

// Mensaje entrada/selección correcta
let msjOk= "OK";

// Elemento html => formulario 
let formulario = document.getElementById("form0");

// Elemento html => lista aficiones
let listaAficiones = document.getElementsByName("aficiones")[0];

// Elemento html => input nueva afición
let inputNuevaAficion = document.getElementsByName("newaficion")[0];

// Elemento html => check aceptar condiciones
let checkAceptarCondiciones = document.getElementsByName("aceptar")[0];

// Elemento html => input password
let inputPassword = document.getElementsByName("passwd01")[0];

// Elemento html => input confirmar password
let inputCheckPassword = document.getElementsByName("passwd02")[0];

// Elemento html => input email
let inputEmail = document.getElementsByName("email")[0];

// Elemento html => input usuario
let inputUsuario = document.getElementsByName("usuario")[0];

// Elemento html => input dni
let inputDni = document.getElementsByName("dni")[0];

// Elemento html => botón Limpiar
let botonLimpiar = document.getElementsByName("limpiar")[0];

// Elemento html => botón Guardar datos
let botonGuardar = 	document.getElementsByName("guardar")[0];

// Elemento html => botón Regístrate
let botonRegistrar = document.getElementsByName("registrar")[0];

// Elemento html => botón Recuperar Datos
let botonRecuperar = document.getElementsByName("recuperar")[0];

// Elemento html => botón Añadir Afición
let botonAddAficion = document.getElementsByName("addAficion")[0];

// Elemento html => checkbox ver password
let checkVerPassword01 = document.getElementsByName("verPassword01")[0];

// Elemento html => checkbox ver password de confirmación
let checkVerPassword02 = document.getElementsByName("verPassword02")[0];

// Array que contiene los inputs cuyo valor se guardará en una cookie
let itemsToSave = [inputUsuario, inputPassword, inputCheckPassword,
					inputEmail, inputDni];

// Array que contiene los label que muestran mensajes al usuario 
let labelsMensaje = [];

// Cuando se ha terminado de cargar la página web, se ejecuta la
// función iniciar()
window.addEventListener("load", iniciar, false);

// Se ejecuta justo después de cargarse la página web
// Añade los elementos html (LABEL) en los que se mostrarán los 
// mensajes error/ok
// Añade controladores de eventos a los elementos html
// Crea las cookies y las inicializa a ""
function iniciar(){
	
	// Para cada uno de los elementos html a validar creamos un label
	// adyacente(a su derecha) para mostrar los mensajes error/ok 
	// asociados. Asignamos un atributo id a los labels nuevos.
	// Los labels creados se añaden al array "labelsMensaje"
	insertAfter (inputUsuario, crearLabelError(inputUsuario));
	insertAfter(checkVerPassword01.nextSibling, crearLabelError(inputPassword));
	insertAfter(checkVerPassword02.nextSibling, crearLabelError(inputCheckPassword));
	insertAfter (inputEmail, crearLabelError(inputEmail));
	insertAfter (inputDni, crearLabelError(inputDni));
	insertAfter (listaAficiones, crearLabelError(listaAficiones));
	formulario.insertBefore(crearLabelError(checkAceptarCondiciones), botonRegistrar);

	// Añadir label mensajes error del input "Nueva afición" a 
	// la dcha del botón "Añadir Afición"
	insertAfter (botonAddAficion, crearLabelError(inputNuevaAficion));
	
	// Añadir label mensajes error check "Aceptar condiciones" a la dcha 
	// del botón "registrar" 
	insertAfter (botonRegistrar, crearLabelError(botonRegistrar));

	// Añadir controladores de eventos a los botones
	botonLimpiar.addEventListener("click",limpiarFormulario,false);
	botonRecuperar.addEventListener("click",recuperarDatos,false);
	botonGuardar.addEventListener("click",guardarDatos,false);
	botonAddAficion.addEventListener("click", addAficion, false);
	
	// Añadir controladores de eventos a los elementos html que deben ser validados
	checkAceptarCondiciones.addEventListener("change",condicionesAceptadas,false);
	listaAficiones.addEventListener("change",validarAficiones,false);
	inputUsuario.addEventListener("change",validarUsuario,false);
	inputDni.addEventListener("change",validarDni,false);
	inputEmail.addEventListener("change",validarEmail,false);
	inputPassword.addEventListener("change",comprobarPassword,false);
	inputCheckPassword.addEventListener("change", comprobarPassword, false);
	
}

// Crea un elemento html label para mostrar mensajes ok/error
// asociados al elemento html que se pasa como parámetro
function crearLabelError(elementoAsociado){
	let nuevoLabel = document.createElement("LABEL");
	nuevoLabel.setAttribute("id", "error_"+ elementoAsociado.getAttribute("name"));
	labelsMensaje.push(nuevoLabel);
	return nuevoLabel;
}

// Inserta el elemento html (parámetro "nuevo") después del elemento html 
// que se pasa como parámetro "anterior".
function insertAfter (anterior, nuevo){
	if(anterior.nextSibling){ 
		anterior.parentNode.insertBefore(nuevo,anterior.nextSibling); 
	} else { 
		anterior.parentNode.appendChild(nuevo); 
	}
}	

// Cambia el texto contenido en un elemento html
// El color del texto será el especificado por marámetro "nuevoColor"
function ponerTexto (elemento, nuevoTexto, nuevoColor ){
	elemento.style.color = nuevoColor;	
	elemento.innerHTML = nuevoTexto;
}	

// Borra datos introducidos por el usuario
// Borra mensajes error/ok	
function limpiarFormulario(){
	// Inicializar a false variable hayError
	hayError = false;
	// Borra mensajes validación
	for (let j=0; j<labelsMensaje.length; j++){
		labelsMensaje[j].innerHTML = "";
	}
}

// Si está marcado el check de aceptar condiciones 
// muestra mensaje ok 
// Si no está marcado el check de aceptar condiciones 
// muestra mensaje error 
function condicionesAceptadas(){
	let aceptadas = checkAceptarCondiciones.checked;
	let label = document.getElementById("error_"+ checkAceptarCondiciones.getAttribute("name"));
	if (!aceptadas)	{
		ponerTexto(label,msjErrorCondiciones,rojo);
		hayError = true;
	}else
		ponerTexto(label,msjOk,verde);	
	
}	

// Comprueba que se han seleccionado como mínimo 2 aficiones
// Muestra mensaje ok/error
function validarAficiones(){
	let items = listaAficiones.options;
	let numSeleccionados = 0;
	for (let i=0; (i<items.length) && (numSeleccionados < 2); i++){
		if (items[i].selected)
			numSeleccionados++;
	}	
	let label = document.getElementById("error_"+ listaAficiones.getAttribute("name"));
	if (numSeleccionados < 2){		
		ponerTexto (label,msjErrorAficiones,rojo);
		hayError = true;
	}
	else
		ponerTexto(label,msjOk,verde);	
}


// Valida todas las selecciones y datos introducidos por el usuario.
// Si son correctos devuelve true y false en otro caso.
function validarFormulario(){
	hayError = false;
	validarUsuario();
	validarPassword(inputPassword);
	validarPasswordRepetida();	
	validarEmail();
	validarDni();
    validarAficiones();
	condicionesAceptadas();
	if (hayError)
		ponerTexto(botonRegistrar.nextSibling, msjErrorDatosFormulario, rojo);	
		
	return (!hayError);			
}


// Valida que el usuario introducido tenga entre 2 y 25 caracteres que 
// pueden ser letras, números, _ y - 
function validarUsuario(){	
	let pattern = /^[a-zA-Z0-9]{2,25}$/;	
	let texto = (inputUsuario.value || "");
	let labelAsociado = document.getElementById("error_"+ inputUsuario.getAttribute("name"))
	if (texto.match(pattern))
	{
		ponerTexto(labelAsociado, msjOk, verde);	
	}
	else
    {		
		ponerTexto(labelAsociado, msjErrorUsuario, rojo);	
		hayError = true;		
	}
}

// Valida que el mail introducido tenga sólo letras y una @ y un punto
function validarEmail(){	

	let pattern = new RegExp ("^[a-zA-Z]+@[a-zA-Z]+(\.[a-zA-Z]+)$");
	let labelAsociado = document.getElementById("error_"+ inputEmail.getAttribute("name"))
	if (pattern.test(inputEmail.value || ""))
	{
		ponerTexto(labelAsociado, msjOk, verde);	
	}
	else
    {		
		ponerTexto(labelAsociado, msjErrorEmail, rojo);	
		hayError = true;		
	}
}	

// Valida si la password introducida es correcta
// Se considera como válida una password que tenga 
// entre 4 y 9 letras o números.
// Devuelve true si el input Password contiene una
// password válida y false en otro caso
function validarPassword(input){
	
	let pattern = new RegExp ("^[A-Za-z0-9]{4,9}$");
	let labelAsociado = document.getElementById("error_"+ input.getAttribute("name"))
	if (pattern.test(input.value || "")){
		ponerTexto(labelAsociado, msjOk, verde);	
		return true;
	}
	ponerTexto(labelAsociado, msjErrorPassword, rojo);	
	hayError = true;
		
	return false;
}	
 
// Respuesta al evento de modificar el input password o 
// el input password comprobación
function comprobarPassword(event){
	if ( event.target ===  inputPassword )
		validarPassword(inputPassword);
	else 
		validarPasswordRepetida();
}

// Comprueba que la password confirmación es válida y es igual a la 
// password  original
// Muestra mensaje con resultado validación ok/error
function validarPasswordRepetida(){	
	let labelAsociado = document.getElementById("error_"+ inputCheckPassword.getAttribute("name"));
	// Si la password de confirmación es válida y coincide con la password original...
	if ( validarPassword(inputCheckPassword) && inputPassword.value === (inputCheckPassword.value) ){
			ponerTexto(labelAsociado, msjOk, verde);
	}
	else{
		ponerTexto(labelAsociado, msjErrorCheckPassword, rojo);
		hayError = true;
	}
}	
// Comprueba si el DNI introducido es válido
// Se considera correcto el DNI que tiene de 1 a 8 dígitos
// seguidos de una letra
function validarDni(){
	let pattern = /^[0-9]{1,8}[TRWAGMYFPDXBNJZSQVHLCKET]$/;
	let texto = (inputDni.value || "").toUpperCase();
	let labelAsociado = document.getElementById("error_"+ inputDni.getAttribute("name"))
	if (texto.match(pattern))
	{
		ponerTexto(labelAsociado, msjOk, verde);	
	}
	else
    {		
		ponerTexto(labelAsociado, msjErrorDni, rojo);	
		hayError = true;		
	}
}	

// Añade una nueva afición a la lista aficiones
// El valor de la nueva afición es el introducido en el
// input "newaficion"
function addAficion(){
	let texto = (inputNuevaAficion.value || "").trim();
	
	let labelAsociado = document.getElementById("error_"+ inputNuevaAficion.getAttribute("name"))
	if (texto.length > 0)
	{
		let nuevoItem = document.createElement("OPTION");
		ponerTexto(labelAsociado, "", verde);	
		nuevoItem.innerHTML = texto;
		listaAficiones.appendChild(nuevoItem);
	}
	else
    {		
		ponerTexto(labelAsociado, msjErrorAddAficion, rojo);	
	}
}	

// Sustituir el valor de los inputs por el contenido 
// de las cookies
function recuperarDatos(){
	for ( let i=0; i<itemsToSave.length; i++ ){
		itemsToSave[i].value = getCookie("cookie"+i);
	}	
}	

// Guardar el valor de los inputs en cookies	
function guardarDatos(){	
	for ( let i=0; i<itemsToSave.length; i++ ){
		setCookie("cookie"+i, itemsToSave[i].value || "", 1);
	}	
}			

// Muestra u oculta la contraseña contenida en los
// inputs de tipo password como respuesta al evento
// de hacer click en checkbox mostrar contraseña
function mostrarPassword(e){
	let input;
	if ( e.target.name === "verPassword01")
		input = inputPassword;
	else
		input = inputCheckPassword;
	
	if (input.type === "password") {
		input.type = "text";
	} else {
		input.type = "password";
	}
}	

// Función definida en w3schools para establecer el valor de una cookie
// https://www.w3schools.com/js/js_cookies.asp
/*	The parameters of the function above are the name of the cookie (cname), 
	the value of the cookie (cvalue), and the number of days until the cookie 
	should expire (exdays).
	The function sets a cookie by adding together the cookiename, the cookie 
	value, and the expires string. */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Función definida en w3schools para recuperar el valor de una cookie
// https://www.w3schools.com/js/js_cookies.asp
/*  The parameters of the function above are the name of the cookie (cname), 
	the value of the cookie (cvalue), and the number of days until the cookie 
	should expire (exdays).
	The function sets a cookie by adding together the cookiename, the cookie 
	value, and the expires string. */
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
	
	