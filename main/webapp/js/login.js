var backend = "https://crudcrud.com/api/72a78ab259e24dd7bbba5a9e727c6d22";
var medicos = new Array();
let horarios = new Array();
var medico = {cedula: "", nombre: "", contrasena: "", especialidad: "", costo: 0, zona: "", horario: horarios };
var id = "";
var urlLocal = "http://localhost:8080/mavenproject1/";
const NET_ERR=999;
//Agregar evento a boton login y register onclick


//valida que no hayan espacios vacios
function validarDatosLogin(){
    //inputs
    var cedulaMed = document.getElementById("idMed");
    var passMedico = document.getElementById("passMed");
    var error = false;

    if (cedulaMed.value.length == 0) {
        error = true;
    }

    if (passMedico.value.length == 0) {
        error = true;
    }
    id = cedulaMed.value;
    return error;
}

//me inserta al medico encontrado en el localStorage
function loadMedicoLocalStorage(){
    localStorage.setItem('MEDICO', JSON.stringify(medico));
}

//Buscara al medico en el array que extraimos de crudcrud y lo cargara en el objeto medico
//si existe retorna true y si no existe retorna false
function loadMedicoFromList(){
    var medSearch = false;
    medicos.forEach(function(m){
        console.log(m.cedula +"-"+id);
        if(m.cedula === id){
            medico = m;
            medSearch = true;
        }
    });
    //console.log(medSearch);
    return medSearch;
}

//este metodo me extraera el array creado en crudcrud con los medicos registrados
function fetchArrayMedicos() {
    //se crea un request para enviarlo al fetch, en este caso envia una peticion GET (no lleva body , esto solo las peticiones POST)
    const request = new Request(backend + '/medicos', {method: 'GET', headers: {}});
    (async () => {
        try {
            //esperamos por la promise del fetch ( esperamos por la respuesta)
            const response = await fetch(request);
            //verificamos si la respuesta es ok
            if (!response.ok) {
                console.log("ERROR 59");
                return;
            }
            //si la respuesta es ok se saca de la respuesta los datos en un objeto json
            medicos = await response.json();
        } catch (e) {
            console.log("ERROR 65");
        }
    })();
} 

function AbrePagLogeo(event){
    //evitamos que se active la accion por default de la etiqueta
    event.preventDefault();
    //se valida que no hayan espacios vacios
    if(validarDatosLogin()) return;
    //extraemos el array del crudcrud
    fetchArrayMedicos();
    //Buscamos el medico en ese array y lo cargamos en el objeto
    if(!loadMedicoFromList()) return;
    //si el medico existe entonces lo cargamos en el localstorage para poder desde la pagina de registro extraer sus datos y colocarlos en pantalla
    loadMedicoLocalStorage();
    //accedo a la pagina de registro 
    document.location = urlLocal+"registro.html";
}

function AbrePagRegistro(event){
    //evitamos que se active la accion por default de la etiqueta
    event.preventDefault();
    //accedo a la pagina de registro
    document.location = urlLocal+"registro.html";
}

function loaded(){
    //le agrego listener al boton de login
    document.getElementById("log").addEventListener("click",AbrePagLogeo);
    //le agrego listener al boton de registrar
    document.getElementById("registrar").addEventListener("click",AbrePagRegistro);
}
  
  document.addEventListener("DOMContentLoaded",loaded);