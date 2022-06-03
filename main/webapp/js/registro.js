var backend = "https://crudcrud.com/api/7b6dde5dfbd54d319d56d8fe962361ab";
var medicos = new Array();
let horarios = new Array();
var horario = { dia:"", horaInicio:"", horaFinal:""};
var medico = {cedula:"" , nombre: "", contrasena: "", especialidad: "", costo: 0, zona: "", horario: horarios };
var id = "";
var urlLocal = "http://localhost:8080/mavenproject1/";

//valida que no hayan datos vacios
function validarDatosRegistros() {
    //inputs
    var cedulaMed = document.getElementById("idMed");
    var passMedico = document.getElementById("passMed");
    var nombreMedico = document.getElementById("nombreMed");
    var especMedico = document.getElementById("especMed");
    var costoConsulMedico = document.getElementById("costoConsulMed");
    var zonaMedico = document.getElementById("zonaMed");
    var error = false;

    if (cedulaMed.value.length == 0) {
        error = true;
    }
    if (passMedico.value.length == 0) {
        error = true;
    }
    if (nombreMedico.value.length == 0) {
        error = true;
    }
    if (especMedico.value.length == 0) {
        error = true;
    }
    if (costoConsulMedico.value.length == 0) {
        error = true;
    }

    if (zonaMedico.value.length == 0) {
        error = true;
    }
    return error;
}

//me crea el objeto medico con los valores de cada campo
function loadMedico(){
    reset();
    console.log("AAAAA "+$("#idMed").val());
    medico.cedula = $("#idMed").val();
    medico.contrasena = document.getElementById("passMed").value;
    medico.nombre = document.getElementById("nombreMed").value;
    medico.especialidad = document.getElementById("especMed").value;
    medico.costo = document.getElementById("costoConsulMed").value;
    medico.zona = document.getElementById("zonaMed").value;
    medico.horario = horarios;
    // med =JSON.parse(localStorage.getItem('MEDICO')); //Se parsea ya que es texto
}

//me elimina al medico del localStorage (esto sucedera cuando me regreso a la pagina de login(index.html)
function deleteMedicoLocalStorage(){
    localStorage.removeItem('MEDICO');
}

//metodo para registrar un medico
function actionRegistrar(event){
    event.preventDefault();
    //se validan los campos (ninguno vacio)
    if(validarDatosRegistros() === true)return;
    //Si no hay ninguno vacio se registra(carga el objeto medico)
    loadMedico();
    //Lo guardo en el crudcrud
    add();
    //reseteo el formulario
    resetForm();
    //resetea los objetos
    reset();
    resetHorario();
}


function resetHorario(){
    horario = {dia: "", horaInicio: "", horaFinal: ""};
    horarios = [];
}

function reset(){
    medico = {cedula: "", nombre: "", contrasena: "", especialidad: "", costo: 0, zona: "", horario: horarios };
}

function resetForm(){
   document.getElementById("idMed").value = "";
   document.getElementById("passMed").value= "";
   document.getElementById("nombreMed").value= "";
   document.getElementById("especMed").value= "";
   document.getElementById("costoConsulMed").value= "";
   document.getElementById("zonaMed").value= "";
}

//ESTE METODO LO QUE HARA ES INSERTAR EN EL CRUDCRUD UN NUEVO REGISTRO, EN ESTE CASO INSERTARA UN NUEVO MEDICO 
function add() {
    //se crea un objeto request para mandar al fetch 
    // 1-Parametro: ( el objeto backend es el url del servidor(variable creada)+personas)
    //2- Objeto que recibe el tipo de metodo peticion, encabezado , cuerpo de la peticion(le mando el objeto persona en json)
    const request = new Request(backend + '/medicos', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(medico)});
    //se llama una funcion anonima y autoinvocada (con () al final para que se invoque automaticamente)
    //una vez que se tenga bien preparada la peticion se envia al fecth para esperar la respuesta
    (async () => {
        try {
            //se manda una perticion fetch (mando por parametro un objeto request para poder recibir un response)
            //el fecth recibe un request con una peticion post, entonces el servidor sabe que tiene que registrar o hacer alguna accion (a excepcion de devolver un objeto)
            const response = await fetch(request);
            //verifico si el response enviado por el fetch se recibio correctamente con ok (se agrego correctamente)
            if (!response.ok) {
                //errorMessage(response.status, $("#add-modal #errorDiv"));
                console.log("ERROR al agregar");
                return;
            }
            //limpiamos el formulario
            reset();
        } catch (e) {
           console.log('Error');
        }
    })();
} 

//me abrira el popup de horario
function actionHorarioPopup(event) {
    event.preventDefault();
    verificaCheckBox();
    renderPopup();
}

function renderPopup() {
    //localizamos la etiqueta con id overlay y le agregamos la clase active (con toggle)
    ////con toggle si la clase ya la tiene la elimina y si no la agrega
    //la clase active me pondra la etiqueta overlay en display para que se muestre
    document.getElementById("overlay").classList.toggle("active");
    //le agrego la clase active por defecto
    document.getElementById("popup").classList.toggle("active");
}

//verifica que no haya ningun medico en el local, si lo hay entonces coloca sus datos en los campos (es porque dio a la opcion de logeo)
function validarLogeo(){
     medico =JSON.parse(localStorage.getItem('MEDICO')); //Se parsea ya que es texto
     return medico;
}

//Este metodo es para cargar los datos del medico en los campos del formulario 
//(ESTE METODO SOLO SE USARA SI SE ACCEDIO A LA OPCION DE LOGIN Y EXISTE UN MEDICO EN EL LOCALSTORAGE)
function cargarDatosMedicoLog(){
    document.getElementById("idMed").value = medico.cedula;
    document.getElementById("passMed").value =  medico.contrasena;
    document.getElementById("nombreMed").value =  medico.nombre;
    document.getElementById("especMed").value =  medico.especialidad;
    document.getElementById("costoConsulMed").value =  medico.costo;
    document.getElementById("zonaMed").value = medico.zona;
}

//metodo que verifica checkbox
function verificaCheckBox(){
    if ($('#monday').prop('checked')) //lunes
      $("#horarioLunes").prop("style","visibility:visible;");
    if(!$('#monday').prop('checked'))
          $("#horarioLunes").prop("style","visibility:hidden;");
    if ($('#thuesday').prop('checked'))  //martes
        $("#horarioMartes").prop("style", "visibility:visible;");
    if (!$('#thuesday').prop('checked'))
        $("#horarioMartes").prop("style", "visibility:hidden;");
    if ($('#wednesday').prop('checked'))  //miercoles
        $("#horarioMiercoles").prop("style", "visibility:visible;");
    if (!$('#wednesday').prop('checked'))
        $("#horarioMiercoles").prop("style", "visibility:hidden;");
    if ($('#thursday').prop('checked'))  //jueves
        $("#horarioJueves").prop("style", "visibility:visible;");
    if (!$('#thursday').prop('checked'))
        $("#horarioJueves").prop("style", "visibility:hidden;");
    if ($('#friday').prop('checked')) //viernes
        $("#horarioViernes").prop("style", "visibility:visible;");
    if (!$('#friday').prop('checked'))
      $("#horarioViernes").prop("style", "visibility:hidden;");
}

function ocultaCheckBoxs(){
     $("#horarioLunes").prop("style","visibility:hidden;");
     $("#horarioMartes").prop("style", "visibility:hidden;");
     $("#horarioMiercoles").prop("style", "visibility:hidden;");
     $("#horarioJueves").prop("style", "visibility:hidden;");
     $("#horarioViernes").prop("style", "visibility:hidden;");
}

function  insertaHorario(horario){
    //inserto un horario si el array esta vacio
    if(horarios.length === 0){
        horarios.push(horario);
    }
    //si el array no esta vacio busco a ver si existe un horario con ese dia y lo remplazo
    horarios.forEach(function(h){
        if(horario.dia === h.dia){
            h.horaInicio = horario.horaInicio;
            h.horaFinal = horario.horaFinal;
        }
    });    
}

function  verHorarios(horario){
    horarios.forEach(function (h) {
        console.log(h.dia +" - "+h.horaInicio+" - "+h.horaFinal);
    });   
}
//Me devuelve a la pagina de index.html
function actionRegresar(event){
    event.preventDefault();
    //elimino al medico del localStorage (si es que existe) si existe es porque se accedio a una cuenta existente
    deleteMedicoLocalStorage();
    //dejamos le formulario vacio antes de regresarnos al index.html
    resetForm();
    //nos vamos a la pagina index.html
    document.location = urlLocal+"index.html";
}

function actionRegresarPopup(event){
    
     event.preventDefault();
     ocultaCheckBoxs();
     renderPopup();
     
}

function actionAplicarHorario(event){
     event.preventDefault();
     
     if ($('#monday').prop('checked') ) {
         horario.dia = $('#monday').val();
         horario.horaInicio = $('#mon-sh').val();
         horario.horaFinal = $('#mon-fh').val();
         console.log(horarios.includes(horario));
         insertaHorario(horario);
         verHorarios();
     }
     
      if ($('#thuesday').prop('checked') ) {
         horario.dia = $('#thuesday').val();
         horario.horaInicio = $('#thues-sh').val();
         horario.horaFinal = $('#thues-fh').val();
         insertaHorario(horario);
         verHorarios();
     }
     
      if ($('#wednesday').prop('checked') ) {
         horario.dia = $('#wednesday').val();
         horario.horaInicio = $('#wednes-sh').val();
         horario.horaFinal = $('#wednes-fh').val();
         insertaHorario(horario);
         verHorarios();
     }
     
      if ($('#thursday').prop('checked') ) {
         horario.dia = $('#thursday').val();
         horario.horaInicio = $('#thurs-sh').val();
         horario.horaFinal = $('#thurs-fh').val();
        insertaHorario(horario);
        verHorarios();
     }
     
      if ($('#friday').prop('checked') ) {
         horario.dia = $('#friday').val();
         horario.horaInicio = $('#fri-sh').val();
         horario.horaFinal = $('#fri-fh').val();
         insertaHorario(horario);
         verHorarios();
     }
     ocultaCheckBoxs();
     actionRegresarPopup(event);
}

function actionCheckDia(event){
    //verificar checks
    verificaCheckBox();
}


    
function loaded() {
    //si existe un medico en el  local storage es que se accedio desde el boton de login a un medico que estaba en los registros
    //entonces lo que hara es cargar ese objeto medico del localstorage para poder insertar sus datos en los campos del formulario
    if(validarLogeo() !== null)
        cargarDatosMedicoLog();
    //Se crean los listeners
    $("#horarioBtn").on("click", actionHorarioPopup);
    $("#registrarBtn").on("click", actionRegistrar);
    $("#regresarBtn").on("click", actionRegresar);
    $("#regresarPopup").on("click", actionRegresarPopup);
    $('input[type=checkbox]').on("click", actionCheckDia);
    $("#aplicarPopup").on("click", actionAplicarHorario);
}


document.addEventListener("DOMContentLoaded", loaded);
