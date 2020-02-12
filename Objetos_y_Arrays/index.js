// Se define la clase "pizza" mediante una función
function pizza (nombre, precio, ingredientes) {

	this.nombre = nombre||"NoName";
	this.precio= precio||10;
    this.ingredientes = ingredientes||["Mozarella", "Tomate", "Albahaca"];
    
    // Método que establece el tiempo para hornear
	this.calculaTiempoParaHornear = function(){
        return 10 + this.ingredientes.length * 2;
    }
    
    
    this.tiempo_para_hornear = this.calculaTiempoParaHornear();

    /* Método de la clase que reduce el valor del atributo 
       "tiempo_para_hornear" un número entero aleatorio entre 
       1 y 10. Si ha llegado a 0 ya no se reduce más.*/
	this.hornear = function() {
        if (this.tiempo_para_hornear > 0){
            let aleatorio= Math.floor(Math.random() * 10 + 1);
            this.tiempo_para_hornear =
                (aleatorio > this.tiempo_para_hornear)? 0 : this.tiempo_para_hornear - aleatorio;
        }
    }

    // Método que devuelve un string con los datos de la pizza
    this.toString = function() {
        return  (" Nombre => " + this.nombre + ";  Precio => " + this.precio + 
                ";  Ingredientes => " + this.ingredientes +
                ";  Tiempo Hornear => " + this.tiempo_para_hornear);
    }
}


// Crear tres pizzas
let pizzGnata= new pizza("Pizz_Ñata", 14.50, ["Jamón York","Piña"]);
let pizzSosa = new pizza("Pizz_Sosa");
let pizzBacona = new pizza(
    "Pizz_Bacona", 18.25, ["Carne Vacuno","Pollo Marinado","Bacon","Huevo"]
);

// Crear array de pizzas
let misPizzas = [pizzGnata, pizzSosa, pizzBacona];

// Muestra, en el div "datosPizzas" del documento html, la información 
// de todas las pizzas contenidas en el  array "misPizzas"
function mostrarPizzas(){ 
    mostrarTexto("datosPizzas", getEstadoPizzas());
}

// Devuelve un "string" que contiene la información de
// todas las pizzas contenidas en el  array "misPizzas"
function getEstadoPizzas(){ 
    let datos = "";
    for(let i=0; i < misPizzas.length; i++){
        datos += ("<br />" + misPizzas[i].toString() + "<br />");
    }
    return datos;
}

// Indica si ya se está ejecutando un intervalo
let intervaloEnEjecucion = false;

/* 
   Cada segundo se llama a la función hornear de cada pizza 
   y posteriormente se actualizan en el div "estadoPizzas" 
   los valores de las pizzas 
*/
function empiezaHornear(){
    // Sólo ejecutamos este código si no hay ningún intervalo
    // en curso. Con el fin de evitar comportamiento inestable
    // de la aplicación cuando el usuario pulsa varias veces
    // seguidas el botón "EMPIEZA HORNEAR"
    if (!intervaloEnEjecucion){
        intervaloEnEjecucion = true;

        // Contador de segundos
        let numSegundos = 0;

        // Texto para mostrar en el div "estadoPizzas"
        let estadoPizzas ="";

        // Borrar el contenido previo del div "estadoPizzas""
        mostrarTexto ("estadoPizzas", "");
        
        /* 
        Si las pizzas ya han terminado de hornearse actualizar los 
        datos estado de las pizzas en el div "datosPizzas"y salir de 
        esta función 
        */
        if (pizzasTerminadas()){
            mostrarPizzas();
            return;
        }
        
        /* 
        Cada segundo se llama a la función hornear de cada
        "pizza" y va mostrando en el div "estadoPizzas" 
        los valores actualizados de las pizzas
        */
        let intervalo = setInterval( function () {
            // Si las pizzas aún no han terminado de hornearse...
            if (!pizzasTerminadas()){
                for(let i=0; i < misPizzas.length; i++){
                    misPizzas[i].hornear();
                } 
                numSegundos++;
                estadoPizzas +=  "<BR \> ------ Segundo  " + numSegundos +                
                                "  ------<BR \>"+ getEstadoPizzas();
                mostrarTexto("estadoPizzas", estadoPizzas);
            }
            // "else" -> Ya están horneadas todas las pizzas
            else {
                // Parar el intervalo y mostrar en div "mensajeTerminadas"
                // un texto indicando que ya están horneadas todas las
                // pizzas
                clearInterval(intervalo);
                let texto = 
                    "<br /><br />      ********   Todas las Pizzas Horneadas   ********" ;         
                mostrarTexto("mensajeTerminadas", texto);
                intervaloEnEjecucion = false;
            }
        } , 1000);
     
    }
}
// Comprueba si todas las pizzas del array "misPizzas" 
// han terminado de hornearse, es decir, la propiedad 
// "tiempo_para_hornear" del objeto "pizza" tiene valor
// cero. Devuelve "true" si todas las pizzas han terminado
// de hornearse y "false" en otro caso
function pizzasTerminadas (){
    let terminadas = true;
    misPizzas.forEach(function(elemento){
        terminadas = terminadas && (elemento.tiempo_para_hornear === 0);
    });
    return terminadas;
}

// Muestra un texto en un elemento del HTML
// parámetro "texto" -> texto a mostrar
// parámetro "elementoHTML" -> elemento del HTML donde se 
// va a mostrar el texto
function mostrarTexto (elementoHTML, texto){
    document.getElementById(elementoHTML).innerHTML = texto;

}
