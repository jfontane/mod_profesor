//***********************************************************************
// OBTIENE LAS CARRERAS EN LAS QUE DICTA CLASES UN PROFESOR ESPECIFICO
//***********************************************************************
function load() {
  let usuario = '24912834';
    $.post( "../funciones/getProfesorPorUsuario.php", {'usuario':usuario}, function( datos ) {
        let obj = JSON.parse(datos);
        let idProfesor = obj.data[0].id;
        cargarCarreras(idProfesor);
    });
}

//**********************************************************************************
// FUNCION QUE OBTIENE LAS CARRERAS EN LAS QUE DICTA CLASES UN PROFESOR ESPECIFICO
//**********************************************************************************
function cargarCarreras(idProfesor) {
  let parametros = {"action":"Listar",'profesor':idProfesor};
  $.post( "../funciones/getCarrerasPorIdProfesor.php", parametros, function( data ) {
    let obj = JSON.parse(data);
    let nav = `<nav aria-label="breadcrumb" role="navigation">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Carreras</li>
                </ol>
              </nav>`;
    let titulo = '<h1><i>Escuela Normal Superior N&deg; 40 "Mariano Moreno"</i></h1><h3>Carreras del Profesor</h3><hr>';

    $("#breadcrumb").html(nav);
    $("#titulo").html(titulo);
    $("#resultado").html("");
    obj.data.forEach(carrera => {
       let resul = `<div class="col-md-4">
             <div class="card" style="width: 18rem;">
                     <img src="../assets/img/`+carrera.imagen+`" class="card-img-top">
                     <div class="card-body">
                         <h5 class="card-title">`+carrera.descripcion+`</h5>
                             <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="carrera btn mr-2" data-idcarrera="`+carrera.id+`" data-idprofesor="`+carrera.idProfesor+`"><i class="fas fa-link"></i>Ingresar</a>
                         <a href="#" class="btn "><i class="fab fa-github"></i> Github</a>
                     </div>
                   </div>
             </div>`;
        $("#resultado").append(resul);
     });
  });
}
