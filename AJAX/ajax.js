"use strict";
 
// Máximo número de fallos permitidos
let numFallosPermitidos = 6;

// Número fallos cometidos por el jugador 
let numFallos = 0;

// Botones con las letras del alfabeto
let arrayBotones = [];

// Palabra que se muestra al usuario durante la partida
// contiene las letras acertadas y guiones bajos en las
// posiciones cuya letra está pendiente de adivinar
let vistaPalabra = "";

// Cadenas para obtener ruta imágenes ahorcado 
let refImagen = "images/hang";
let extension = ".png";

// Array que contiene las imágenes ahorcado
let imagenesAhorcado = [];

// Imágenes que se muestran cuando se gana/pierde partida
let rutaImagenWin = "images/win.jpg";
let rutaImagenLost = "images/lost.jpg";

// Letras palabras que se muestran en los botones
let letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

// Elemento div que contiene los botones letras alfabeto
let divBotones = document.getElementById("letras");

// Elemento html que muestra la palabra con letras acertadas
let lbPalabra = document.getElementById("palabra");

// Elemento html que contiene la imagen
let elementoImagen = document.getElementById("imagen");

// Elemento html que contiene los mensaje a mostrar al usuario
let elementoMensajes = document.getElementById("mensajes");

 // True si ha terminado la partida y false en otro caso
let finPartida = false;

// Palabra a adivinar
let palabraSecreta;

// Aciertos que ha conseguido el usuario en la partida actual
let numAciertos = 0;

// Número letras de la palabra a acertar
let numLetras = 0;

// Ejecutar función inicial 
primeraVez();

// Se ejecuta cuando se carga la página por primera vez
// Prepara las imágenes que se van a mostrar en el juego,
// añade al html los botones que contienen las letras alfabeto, 
// empieza una nueva partida y, para debug, muestra en consola
// la palabra secreta a adivinar
function primeraVez(){  
    for(let i=0; i<= (numFallosPermitidos + 1); i++){
        imagenesAhorcado.push(refImagen + i + extension);
    }
    crearBotones();  
    mostrarImagen(imagenesAhorcado[0]);
    document.getElementById("nuevaPartida").addEventListener("click", nuevaPartida, false);
}

// Crea los botones y los añade al html y al array botones
function crearBotones(){
    for (let i=0; i<letras.length; i++){
        let nuevoBoton = document.createElement("BUTTON");
        nuevoBoton.innerHTML = letras.charAt(i);
        nuevoBoton.addEventListener("click", comprobarLetraFetch, false);
        nuevoBoton.disabled = true;
        divBotones.appendChild(nuevoBoton);
        arrayBotones.push(nuevoBoton);
    }
}

// Muestra en el html la imagen cuya ruta se pasa como parámetro
function mostrarImagen(source){
    elementoImagen.setAttribute("src", source);
}

// Esta función no se utiliza, con fines didácticos, 
// Utiliza el API XMLHttpRequest, POST y respuesta formato JSON
// Respuesta al evento click botones letras
// Hacer una petición al servidor enviando la letra correspondiente 
// al botón pulsado para comprobar si dicha letra está en la palabra
// buscada. El servidor devuelve en formato JSON las posiciones de la 
// palabra en las que aparece dicha letra
// ejemplo formato respuesta {"size":"2","pos0":"3","pos1":"5"}
function comprobarLetra(){
    // Si ha finalizado la partida salir de esta función
    if (finPartida)
        return;
    
    // Desactivar botón pulsado
    this.disabled = true;

    // Obtener letra que corresponde al botón pulsado
    let letraSeleccionada = this.innerHTML;

    // Crear y configurar la petición al servidor
    let xmlHttp = new XMLHttpRequest();    
    xmlHttp.open("POST","posicionesLetra.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Cuando cambia el estado de la conexión con el servidor
    // intentamos recuperar las posiciones de la palabra en las 
    // que se encuentra la letra seleccionada
    xmlHttp.onreadystatechange = function (){
        if (xmlHttp.readyState == 4){
            if (xmlHttp.status == 200){
                // obtener respuesta del servidor y convertir a formato JSON
                let respuesta = JSON.parse(xmlHttp.responseText); 
                // Actualizar estado partida según la respuesta del servidor
                actualizarPalabra (respuesta, letraSeleccionada);                         
            }
        }
    }
    // enviar petición y sus parámetros al servidor
    xmlHttp.send("letra=" + letraSeleccionada);
}

// Actualiza estado partida con los aciertos de la letra
// que se pasa como parámetro.
// "respJSON" contiene información(formato json) del número
// de veces en las que aparece la letra en la palabra secreta y
// de las posiciones en las que se encuentra
// ejemplo formato {"size":"2","pos0":"3","pos1":"5"}
function actualizarPalabra(respJSON, letra){
    // Obtener el número posiciones de la palabra en las 
    // que aparece la letra
    let posiciones = Number.parseInt(respJSON.size);
    // Si la letra no está en la palabra secreta
    if (posiciones < 1){
        // Actualizar contador fallos, imagen html y mensaje número fallos permitidos
        numFallos++;
        mostrarImagen(imagenesAhorcado[numFallos]);
        let mensaje = "Fallos Permitidos : " + (numFallosPermitidos - numFallos);
        // Si se ha superado el número máximo de fallos permitidos
        // finalizar partida y mostrar mensaje con la palabra secreta
        if (numFallos > numFallosPermitidos){
            mensaje = 'Fin partida. La palabra secreta es <span>"' + palabraSecreta + '"</span>';
            finPartida = true;
        }
        // Mostrar mensaje información en el html
        elementoMensajes.innerHTML = mensaje;

    }else{
        // La letra está en la palabra secreta
        numAciertos += posiciones;
        // Recuperar las posiciones palabra donde se encuentra la letra
        for (let i=0; i<posiciones; i++){
            let clave = "pos" + i;
            let pos = Number.parseInt(respJSON[clave]);
            let saux = "";
            // Poner la letra acertada en la posición "pos" 
            for (let j=0; j<vistaPalabra.length; j++){
                if (j === pos)
                    saux += letra;
                else
                    saux += vistaPalabra.charAt(j);
            }
            vistaPalabra = saux;
        }
        // Mostrar en la palabra del html las letras acertadas
        mostrarAciertosPalabra();
        // Si ya se han acertado todas las letras de la palabra finalizar
        // partida, mostrar imagen ganadora y mensaje enhorabuena en el html
        if (numAciertos === numLetras){
            elementoMensajes.innerHTML = "Enhorabuena. Palabra acertada"
            finPartida = true;
            mostrarImagen("images/win.jpg");
        }
    }
}

// Muestra en el html la palabra con las letras que ha 
// acertado el usuario
function mostrarAciertosPalabra(){
    let texto = "";
    for (let i=0; i<numLetras; i++){
        texto += vistaPalabra.charAt(i) + " ";
    }
    document.getElementById("palabra").innerHTML = texto;
}

// Respuesta al evento click del botón "Nueva Partida"
// Inicializa variables globales y contenido html
// Realiza petición servidor para obtener nueva palabra secreta 
function nuevaPartida() {
    finPartida = false;
    vistaPalabra = "";
    document.getElementById("palabra").innerHTML = ""; 
    numFallos = 0;
    numAciertos = 0;
    elementoMensajes.innerHTML = "Fallos Permitidos : " + numFallosPermitidos;
    getNumLetras(); 
    mostrarImagen(imagenesAhorcado[0]);
    // habilitar los botones de las letras
    for (let i=0; i<letras.length; i++){       
        arrayBotones[i].disabled = false;
    }  
}

// Usando eL API XMLHttpRequest y método GET, pedir al servidor 
// el número letras de la palabra a acertar
function getNumLetras(){  
    let xmlHttp = new XMLHttpRequest();
    
    xmlHttp.open("GET","palabraJuego.php", true);

    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Cuando cambia el estado de la conexión con el servidor
    // intentamos recuperar el número letras de la palabra
    xmlHttp.onreadystatechange = function (){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            // obtenemos la respuesta del servidor en formato texto y
            // convertimos a tipo entero
            let respuesta = xmlHttp.responseText; 
            numLetras = parseInt(respuesta);
            // Si el servidor no devuelve un número letras válido
            // mostrar mensaje error y finalizar partida
            if (Number.isNaN(numLetras)){
                document.getElementById("mensajes").innerHTML = 
                        "Error recuperando datos del servidor";
                finPartida = true;
            }else{
                let texto = "";
                for (let i=0; i<numLetras; i++){
                    texto += "- ";
                    vistaPalabra += "_";
                }
                document.getElementById("palabra").innerHTML = texto;
                // Pedimos al servidor la palabra secreta   
                getPalabraSecreta();
            }    
        }
    }
    // enviar petición al servidor
    xmlHttp.send();

}

// Solicita al servidor la palabra secreta y la guarda en variable
// global "palabraSecreta"
function getPalabraSecreta(){
    let xmlHttp = new XMLHttpRequest();
    
    xmlHttp.open("GET","palabraSecreta.php", true);

    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Cuando cambia el estado de la conexión con el servidor
    // intentamos recuperar el número letras de la palabra
    xmlHttp.onreadystatechange = function (){
        if (xmlHttp.readyState == 4){
            if (xmlHttp.status == 200){
                // obtenemos la respuesta del servidor en formato texto
                palabraSecreta = xmlHttp.responseText; 
                // Con fines debug se muestra en consola la palabra secreta   
                console.log("DEBUG  :  Palabra secreta => " + palabraSecreta);    
            }                    
        }
    }
    // enviar petición al servidor
    xmlHttp.send();
}

// Utiliza el API Fetch, POST y respuesta servidor formato JSON
// Respuesta al evento click botones letras
// Hacer una petición al servidor enviando la letra correspondiente 
// al botón pulsado para comprobar si dicha letra está en la palabra
// buscada. El servidor devuelve en formato JSON las posiciones de la 
// palabra en las que aparece dicha letra en formato json, 
// ejemplo formato {"size":"2","pos0":"3","pos1":"5"}
function comprobarLetraFetch() {  
    if (finPartida)
        return;

    // Deshabilitar el botón sobre el que se ha hecho click
    this.disabled = true;

    // Recuperar la letra que corresponde al botón pulsado 
    // para enviarla al servidor
    let letraSeleccionada = this.innerHTML;

    // Configurar la petición
    let configFetch = {
        method: "POST",
        body: "letra=" + letraSeleccionada,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    // Lanzar petición y obtener el objeto tipo Promise
    let promesa = fetch("posicionesLetra.php", configFetch);

    // Gestionar la respuesta del servidor
    promesa.then(function (response) {
        // Obtener respuesta en formato JSON
        response.json().then(
            function (objetoJSON) {
                actualizarPalabra (objetoJSON, letraSeleccionada);
        });
    }).catch(function (error) {
        // Mostrar en el html información del error producido y finalizar partida
        elementoMensajes.innerHTML = 
                "Error comprobando letra " + letraSeleccionada + " : " + error.message;
        finPartida = true;
    });
}

