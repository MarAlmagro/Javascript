<?php

// para poder usar variables de sesión
session_start();   


// Recuperar palabra secreta de las variables sesión. 
//Respuesta del servidor : palabra secreta
echo $_SESSION['palabra'];