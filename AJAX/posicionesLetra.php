<?php

session_start();

// devuelve un array con las posiciones de la cadena donde 
// está la letra especificada
function getPosiciones($cadena, $letra) {

    // Posición de la cadena donde se empieza a buscar la letra
    $inicio = 0;
    
    // Posiciones de la cadena donde está la letra a buscar
    $posiciones = array();

    // Recorrer los caracteres del string y añadir al array
    // resultado las posiciones donde se encuentra la letra a buscar
    while (($pos = stripos($cadena, $letra, $inicio)) !== FALSE) {
        $inicio   = $pos + 1;
        array_push($posiciones, $pos);
    }
    return $posiciones;
}

// Recuperamos de la variable sesión la palabra a adivinar
$palabra = $_SESSION['palabra'];
 
// Obtener la letra a comprobar desde los parámetros de la petición
$letraPalabra = $_POST["letra"];

$posiciones = getPosiciones($palabra, $letraPalabra);

$numAciertos = count($posiciones);

// Respuesta en formato JSON
$respuesta = '{"size":"'.$numAciertos.'"';   

// Añadir las posiciones al formato JSON de la respuesta
for ($i = 0; $i < $numAciertos; $i++) {
    $respuesta = $respuesta.',"pos'.$i.'":"'.$posiciones[$i].'"';   
} 

$respuesta = $respuesta.'}';


// Respuesta del servidor : posiciones de la palabra donde 
// está la letra recibida como parámetro
echo $respuesta;
