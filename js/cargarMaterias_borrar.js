//****************************************************************
//CARGA LAS MATERIAS DEL PROFESOR SEGUN LA CARRERA SELECCIONADA
 //***************************************************************
function cargarMateriaPorCarrera(carrera,profesor) {
   alert('acaaaa111');
  let parametros = {"action":"Listar",'carrera':carrera, 'profesor':profesor};
  $.post( "ajax/getCarreraPorId.php", {'carrera':carrera}, function( data ) {
     let obj = JSON.parse(data);
     let nombre_carrera = obj.data[0].descripcion;
     carrera_nombre = obj.data[0].descripcion;
     carrera_id = carrera;
     profesor_id = profesor;
     let titulo = '';
     if (opcion=='alumnos') {
         titulo = '<h1><i>'+nombre_carrera+'</i></h1><h3><strong>Materias</strong> (Cargar Listado Alumnos)</h3><hr>';
     } else if (opcion=='regularidades') {
         titulo = '<h1><i>'+nombre_carrera+'</i></h1><h3><strong>Materias</strong> (Cargar Regularidades)</h3><hr>';
     } else if (opcion=='examenes') {
         titulo = '<h1><i>'+nombre_carrera+'</i></h1><h3><strong>Materias</strong> (Cargar Notas Examenes)</h3><hr>';
     };
     alert('acaaaa');
     let nav = `<nav aria-label="breadcrumb" role="navigation">
                 <ol class="breadcrumb">
                   <li class="breadcrumb-item"><a href="#">Home</a></li>
                   <li class="breadcrumb-item"><a href="#" onclick="cargarCarreras('cursado',`+profesor+`)">Carrerassss</a></li>
                   <li class="breadcrumb-item active">`+carrera_nombre+`</li>
                 </ol>
               </nav>`;
     $("#breadcrumb").html(nav);
     $("#titulo").html(titulo);
  });
  if (opcion=='alumnos' || opcion=='regularidades' || opcion=='examenes') {
        $.post( "ajax/getMateriasPorCarrera.php", parametros, function( data ) {
          let obj = JSON.parse(data);
          $("#resultado").html("");
          let tabla_comienzo = `
                       <table class="table table-striped">
                          <thead>
                             <tr><th>MATERIA</th><th>AÑO</th><th>FORMATO</th><th>CURSADO</th><th>ACCIONES</th></tr>
                          </thead>
                          <tbody>
                        `;
          let filas = ``;
          let tabla_final  = `   </tbody>
                             </table>`;
          if (obj.codigo==100) {
                  obj.data.forEach(materia => {
                       filas += `
                                  <tr><td>`+materia.nombre+` <strong>(`+materia.id+`)</strong></td><td>`+materia.anio+`</td>`+
                                     `<td>`+materia.descripcion_formato+`</td>`+
                                     `<td>`+materia.descripcion_cursado+`</td>`+
                                     `<td>`+
                                     `      <a href="#" class="linkAlumnos" data-idcursado= "`+materia.idCursado+`" data-idprofesor="`+profesor+`" data-idcarrera="`+carrera+`" data-idmateria="`+materia.id+`" data-nombremateria="`+materia.nombre+`" data-toggle="tooltip" data-placement="bottom" title="Listado de Alumnos"><img src="../assets/img/icons/listado_icon.png" width="25"></a>`+
                                     `</td></tr>
                                   `;
                   });
          } else {
                 filas = `
                          <tr><td>No Existen Materias Asociadas.</td></tr>
                         `;
                 }
           $("#resultado").html(tabla_comienzo+filas+tabla_final);
           //$('[data-toggle="tooltip"]').tooltip();

        });
   } else {

   }
}
