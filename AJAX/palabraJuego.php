<?php

session_start();

// Array que contiene las palabras del juego ahorcado
$palabras = 
    array( "abejorro", "botella", "caracol","dinosaurio", "eneldo", "fantasma", 
           "golosina", "hacienda", "imagen", "jirafa", "kiosko", "lenteja", 
           "mantequilla", "naranja", "oleaje", "prestigio", "quimera", "retrato", 
           "soldador", "trabajo", "universo", "ventisca", "whisky","xenofobia", 
           "yegua", "zambomba" );

// obtener una posición al azar dentro del array palabras 
$posicion = array_rand($palabras);  

// obtener palabra situada en posición obtenida al azar
$palabraRandom = $palabras[$posicion];  

// Guardar la palabra en una variable sesión
$_SESSION['palabra']= $palabraRandom;

// Obtener numero letras palabra seleccionada
$numLetras = strlen($palabraRandom);

// Respuesta del servidor : numero letras de la palabra
echo $numLetras;
