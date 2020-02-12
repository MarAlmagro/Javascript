"use strict";


// Elemento html <p> que muestra avisos al usuario
let avisos = document.getElementById("avisos");

// Nodo padre(<ol>)de la lista participantes
let padre = document.getElementById("lista");

// Número de elementos en la lista de participantes
let numParticipantes = 0; 

// Indica si se ha finalizado la competición(true)
// o no(false)
let finalizada = false;

// Empieza una nueva competición
// Borra contenido inputs, lista participantes y 
// muestra mensaje usuario indicando que empieza nueva competición.
// Resetea valor variables "finalizada" y "numParticipantes"
function nuevaComp(){
	finalizada = false;
	numParticipantes = 0;
	avisos.innerHTML = "Empieza nueva competición";
	
	// Obtener todos los elementos input del html
	// y borrar su contenido
	let inputs = document.getElementsByTagName("input");	
	for ( let i=0; i<inputs.length; i++){
        inputs[i].value = "";
    }   
		
	// Borrar lista participantes
    for ( let i=padre.children.length; i>0; i--){
        padre.removeChild(padre.lastElementChild);
    }   
  
}

// Añade un participante a la lista participantes
function addParticipante(){
  // Si la competición está finalizada,
  // mostrar aviso y salir de la función
  if (finalizada){
    avisos.innerHTML = "Añadir => Competición finalizada. No admite cambios";
    return;
  }
  
  // Borrar avisos anteriores
  avisos.innerHTML = "";
  
  // Recuperar el nombre participante 
  let nom = document.getElementById("nombre").value.trim();
  // Si el campo nombre participante está vacío, mostramos aviso
  if (nom === ""){
    avisos.innerHTML += "Añade Participante => Debe introducir un nombre";
  }
  else {
    // Obtener el color letra seleccionado
    let colorSelec = document.getElementById("colores").value;
    // Crear un nuevo elemento <LI> y asignarle en estilo css
    // color letra igual al color seleccionado("colorSelec")
    let newLI = document.createElement("LI");
    newLI.style.color = colorSelec;
    // Asignamos como contenido del nuevo elemento <LI> el
    // nombre que ha introducido el usuario
    newLI.innerHTML = nom;
    // Añadir nuevo elemento <LI> a la lista participantes
    padre.appendChild(newLI);  
	numParticipantes++;
  }
  
}


// Finaliza la competición cambiando color fondo de los 3 primeros 
// elementos de la lista participantes y también el fondo elemento
// que ocupa la última posición
function finalizar(){  
  // Si la competición ya estaba finalizada muestra aviso y
  // termina la ejecución de esta función
  if (finalizada){
    avisos.innerHTML = "Finalizar => Competición ya estaba finalizada";
    return;
  }
  // Estado competición =  finalizada
  finalizada = true;

  // Borrar avisos previos
  avisos.innerHTML = "";
 
  // Si no hay participantes, finalizar competición, mostrar aviso
  // y salir de esta función
  if (numParticipantes === 0){    
    avisos.innerHTML = "Competición Finalizada sin participantes";
    return;
  }
  // Si existe, como mínimo, un elemento en la lista participantes
  // Poner verde el color fondo del primer participante de la lista
  padre.firstElementChild.style.backgroundColor = "PaleGreen";
  // Si hay más de un elemento en la lista de participantes
  if (numParticipantes > 1){
	  // obtener todos los elementos de la lista participantes
	  let participantes = padre.children;
	  
      // Color azul en el fondo del segundo elemento lista participantes
      participantes[1].style.backgroundColor = "PowderBlue";

      // Si existe un tercer elemento en la lista participantes
      // ponemos su fondo naranja
      if (numParticipantes > 2) 
        participantes[2].style.backgroundColor = "Gold";

      // Color rojo en el fondo del último elemento lista participantes
      // Se ejecuta siempre que haya más de un elemento en la lista
      // Si último participante es elemento 2 ó elemento 3, machaca/cambia
      // el color que se había asignado anteriormente
      // El color texto cambia a negro para que se vea mejor con el fondo rojo
      padre.lastElementChild.style.color =  "Black";        
      padre.lastElementChild.style.backgroundColor =  "Salmon";       
  }
  
  // Establecer número participantes a cero
  numParticipantes = 0;
}

// Devuelve la posición/contenido que hay en el elemento input 
// del html que se pasa como primer parámetro(idElemento). 
// Si no es una posición válida, devuelve -1
// Los parámetros indican el valor mínimo que puede tener la
// posición (min) y el valor máximo permitido(max)
// El parámetro
function getPosicion(idElemento, min, max){
  let num = parseInt(document.getElementById(idElemento).value.trim());
  if ( !isNaN(num) && (num >= min) && (num <= max) )
	  return num;
  return -1;
}

// Borra el participante cuya posición en la lista participantes
// es la indicada en elemento input del html con id "pos"
function borrar(){
  // Si la competición está finalizada no se hacen modificaciones y
  // salimos de esta función
  if (finalizada){
    avisos.innerHTML = "Borrar => Competición finalizada. No admite cambios";
    return;
  }
 
  // Si no hay elementos para borrar, mostrar aviso y salir de función
  if (numParticipantes < 1)
  {
    avisos.innerHTML = "No hay participantes para borrar";
    return;
  } 
 // Borrar avisos anteriores
  avisos.innerHTML = "";

  // Obtener posición del elemento a borrar de la lista participantes
  let pos = getPosicion("pos", 1, numParticipantes);
  
  // Si la posición introducida por el usuario no es correcta
  // mostrar aviso y salir de esta función
  if (pos < 1){
    avisos.innerHTML = "Borrar => Error Posición ( sólo valores de 1 a " + 
						numParticipantes + " )";
    return;
  }
  // Borrar elemento lista participantes que está en la 
  // posición indicada
  padre.removeChild(padre.children[pos - 1]);
  numParticipantes -= 1;
}

// Modifica el nombre del participante cuya posición en 
// lista participantes es la indicada en elemento input
// del html con id "pos"
function modificar(){
  // Si la competición está finalizada no se hacen modificaciones y
  // salimos de esta función
  if (finalizada){
    avisos.innerHTML = "Modificar => Competición finalizada. No admite cambios";
    return;
  }
 
  // Si no hay elementos para modificar, mostrar aviso y salir de función
  if (numParticipantes < 1)
  {
    avisos.innerHTML = "No hay participantes para modificar";
    return;
  } 
 // Borrar avisos anteriores
  avisos.innerHTML = "";

  // Obtener posición del elemento a modificar en la lista participantes
  let pos = getPosicion("pos", 1, numParticipantes);
  
  // Si la posición introducida por el usuario no es correcta
  // mostrar aviso y salir de esta función
  if (pos < 1){
    avisos.innerHTML = "Modificar => Error Posición ( sólo valores de 1 a " + 
						numParticipantes + " )";
    return;
  }
   // Recuperar nuevo nombre del participante a modificar
  let nuevoNombre = document.getElementById("nombre").value.trim();
  // Si el campo nombre participante está vacío, mostramos aviso
  if (nuevoNombre === ""){
    avisos.innerHTML += "Modifica Participante => Debe introducir un nombre";
  }
  else {
	  // Modificar contenido elemento lista participantes que está en la 
	  // posición indicada
	  padre.children[pos - 1].innerHTML = nuevoNombre;  
  }
}

// Mueve el participante cuya posición en lista participantes 
// es la indicada en elemento input del html con id "pos" a
// la posición destino indicada en input html con id "posFinal"
function mover(){
	// Si la competición está finalizada no se hacen modificaciones y
	// salimos de esta función
	if (finalizada){
	avisos.innerHTML = "Mover => Competición finalizada. No admite cambios";
	return;
	}
	// Necesitamos que haya como mínimo dos participantes para poder
	// mover de una posición a otra
	if (numParticipantes < 2){
		avisos.innerHTML = "Mover => Necesita 2 participantes como mínimo";
		return;
	}
	// Obtener posición origen del participante que se va a mover
	let origen = getPosicion("pos", 1, numParticipantes);
	// Si la posición origen no es correcta mostrar aviso y salir
	if (origen < 1){
		avisos.innerHTML = "Mover => Error Posición Origen ( sólo valores de 1 a " + 
						numParticipantes + " )";
		return;
    }

	// La posición origen del movimiento es correcta
	// Obtener posición destino del movimiento participante
	let destino = getPosicion("posFinal", 1, numParticipantes);
	// Si la posición destino no es correcta mostrar aviso
	if (destino < 1){
		avisos.innerHTML = "Mover => Error Posición Destino ( sólo valores de 1 a " + 
						numParticipantes + " )";
    }
	else{
		// Si posicion origen y destino son iguales, mostrar aviso y
		// no hacer cambios
		if ( origen === destino){
			avisos.innerHTML = "Mover => Posición origen y destino son iguales";
			return;
		}		
		// Elemento/participante a mover
		let elementoAmover = padre.children[origen - 1];
		// Elemento delante del que vamos a insertar el elemento a mover
		let elementoAdesplazar = padre.children[destino - 1];

		// Mover elemento/participante a la posición destino
		
		if (destino === numParticipantes ){ 
			padre.appendChild(elementoAmover);
			return;
		}
		
		if ( origen < destino )	
			elementoAdesplazar = padre.children[destino];
		
		
		padre.insertBefore(elementoAmover, elementoAdesplazar);
	}
}	