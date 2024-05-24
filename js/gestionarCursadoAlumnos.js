//***********************************************************************************************
//***********************************************************************************************
// CARGA LISTADO DE ALUMNOS CON DATOS GENERALES PARA ARMADO DE LISTAS EN UNA MATERIA ESPECIFICA
//***********************************************************************************************
//***********************************************************************************************
function cargarAlumnosPorMateriaCursado(carrera_id, materia_id,materia_nombre,profesor_id,materia_cursado) {
    //carrera = carrera_id;
    //profesor = profesor_id;
    let datos_evento;
    let evento_codigo;
    let evento_habilitado;
    let titulo = '<h1><i>'+materia_nombre+'</h1></i><h3><strong>Alumnos</strong> (Crear Listado)</h3><hr>';
    let boton_agregar_alumno = '';  
    let carrera_nombre = getCarreraNombrePorId(carrera_id);
    if (materia_cursado == '01') { // 1er Cuatrimestre
       evento_codigo = 1014;
    } else if (materia_cursado == '02') { // 2do Cuatrimestre
       evento_codigo = 1015;
    } else if (materia_cursado == '03') { // Anual
       evento_codigo = 1016;
    };
    
    // Determina si el Evento Armado de Lista de Materias de un Cuatrimestre dado esta habilitado o no.
    datos_evento = getDatosEventoPorCodigo(evento_codigo);
    if (datos_evento.codigo==100) {
       if (datos_evento.habilitado=='Si') {
          evento_habilitado = 'Si';
          boton_agregar_alumno = '<button class="btn btn-info" id="btnCargarAlumno" data-idcarrera="'+carrera_id+'" data-idmateria="'+materia_id+'">Agregar Alumno</button>';
       } else {
          evento_habilitado = 'No';
       }
    } else {
       evento_habilitado = 'No';
       console.log('ERROR: Hubo un error con los datos del Evento '+evento_codigo);
    };
    
    let parametros = {"action":"Listar",'materia':materia_id};
    $.post( "../funciones/getAlumnosCursandoPorMateria.php", parametros, function( data ) {
        let obj = JSON.parse(data);
        let bread = `<nav aria-label="breadcrumb" role="navigation">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"><a href="#" onclick="cargarHome()">Home</a></li>
                      <li class="breadcrumb-item"><a href="#" onclick="cargarCarreras('cursado',`+profesor_id+`)">Carreras</a></li>
                      <li class="breadcrumb-item"><a href="#" onclick="cargarMateriaPorCarrera(`+carrera_id+`,`+profesor_id+`,'cursado')">`+carrera_nombre+`</a></li>
                      <li class="breadcrumb-item">`+materia_nombre+`</li>
                    </ol>
                  </nav>`;
 
      $("#breadcrumb").html(bread);
      $("#titulo").html(titulo);
      $("#resultado").html("");
      // ENCABEZADO DE LA TABLA QUE SE VA A CREAR
      let tabla_comienzo = `
                   <table id="tabla_alumnos_cursando" class="table table-striped">
                      <thead>
                         <tr>
                            <th>APELLIDO Y NOMBRE</th>
                            <th>EMAIL</th><th>TELEFONO</th>
                            <th>DNI</th><th>CURSADO</th>
                            <th>ACCIONES</th>
                         </tr>
                      </thead>
                      <tbody>
                    `;
      // FILAS DE RESULTADO DE LA TABLA
      let filas = ``;
      let nofilas = ``;
      // FIN DE LA TABLA
      let tabla_final  = `   </tbody>
                         </table>`;
      let accion_eliminar;
 
      if (obj.codigo==100) {
            obj.data.forEach(alumno => {
                  accion_eliminar = `<a href="#" title="Eliminar Alumno del Cursado" onclick="cursadoEliminarAlumno(`+alumno.id+`,`+materia_id+`,`+carrera_id+`,`+profesor_id+`)">
                                         <img src="../assets/img/icons/delete_icon.png" width="21">
                                     </a>`;              
                  filas += `
                            <tr><td>`+alumno.apellido+', '+alumno.nombre+` <strong>(`+alumno.id+`)</strong></td>`+
                                `<td>`+alumno.email+`</td>`+
                                `<td>`+alumno.telefono+`</td>`+
                                `<td>`+alumno.dni+`</td>`+
                                `<td><span class="badge badge-info">`+alumno.cursado+`</span></td>`+
                                `<td>&nbsp;`+accion_eliminar+`&nbsp;</td>
                            </tr>
                            `;
            });
       } else {
             nofilas = `
                     <div class="alert alert-dark" role="alert" id="nofilas">
                     <b><img src="../assets/img/icons/alert_icon.png" width="21">&nbsp;&nbsp;</b><span style="color: #000000;"><i>No Existen Alumnos en la Materia.</i></span>
                     </div>
                    `;
       };
    
    let tabla_agregar_alumno = `
                                     <div class="col-xs-12 col-sm-4 col-md-4">
                                        <select name="inputAltaAlumno" id="inputAltaAlumno" class="form-control">
                                           <option value="">-- Alumno --</option>
                                        </select>
                                     </div>
                                     <div class="col-xs-12 col-sm-4 col-md-4">
                                        <select name="inputAltaCursado" id="inputAltaCursado" class="form-control">
                                           <option value="">-- Cursado --</option>
                                        </select>
                                        </div>
                                     <div class="col-xs-12 col-sm-4 col-md-4">
                                        <button type="button" id="btnAgregar" class="btn btn-sm" id="btnAplicar" onclick="cursadoAgregarAlumno(`+materia_id+`,`+carrera_id+`,`+profesor_id+`)">
                                           <img src="../assets/img/icons/add_icon.png" width="22">&nbsp; Agregar
                                        </button>
                                     </div>
                                     <div id="resultado_carga" class="col-xs-12 col-md-12 d-none"> 
                                     </div>
                                  `; 
    $("#resultado").html(tabla_agregar_alumno);    
    $("#resultado").append(tabla_comienzo+filas+tabla_final);                       
    if (nofilas!='') {
      $("#resultado_carga").removeClass('d-none'); 
      $("#resultado_carga").html(nofilas);
    };
    
   //CARGA EL SELECT2 CON LOS ALUMNOS DE LA CARRERA
    $.post( "../funciones/getAlumnosPorCarrera.php", {'carrera':carrera_id}, function( data_alumnos ) {
       let obj = JSON.parse(data_alumnos);
       obj.data.forEach(alumno => {
             $("#inputAltaAlumno").append($('<option/>', {
                   text: '('+alumno.id+') '+alumno.apellido+', '+alumno.nombre+', '+alumno.dni,
                   value: alumno.id,
             }));
       });
    });   
    $('#inputAltaAlumno').select2();
 
    //CARGA EL SELECT2 CON LOS DATOS DEL CURSADO
    $.post( "../funciones/getCursadoForma.php", function( data_cursado ) {
       let obj = JSON.parse(data_cursado);
       obj.data.forEach( cursado_forma => {
             $("#inputAltaCursado").append($('<option/>', {
                   text: cursado_forma.nombre,
                   value: cursado_forma.codigo,
             }));
       });
    });
    $('#inputAltaCursado').select2();
 
    //SI SE VERIFICA QUE NO ESTA HABILITADO ENTONCES SE DESHABILITA TODO EL LISTADO
    if (evento_habilitado=='No') {
       $("#resultado").addClass("disabledbutton");
    }
   });
 }

 
 //****************************************************************************
//CARGA UN ALUMNO A UNA MATERIA ESPECIFICADA
//****************************************************************************
function cursadoAgregarAlumno(idMateria,idCarrera,idProfesor) {
    let alumno = $('#inputAltaAlumno').val();
    let cursado_forma = $('#inputAltaCursado').val()
    $.post( "../funciones/setAlumnoEnMateria.php", {'materia':idMateria, 'alumno':alumno, 'cursado':cursado_forma}, function( data ) {
             let obj = JSON.parse(data);
             $("#resultado_carga").removeClass("d-none");
             
             if (obj.codigo==100) {
                 $("#resultado_carga").html(`<div class="alert alert-dark" role="alert">
                                            <b><img src="../assets/img/icons/ok_icon.png" width="21">&nbsp;</b><span style="color: #000000;"><i>`+obj.data+`</i></span>
                                             </div>`);
                 let datos_alumno = sacaDatosAlumnoParaCursadoPorId(alumno,idMateria); 
                 if (datos_alumno.codigo==100) {
                   //console.log(datos_alumno.data[0].apellido);
                   let accion_eliminar = `<a href="#" title="Eliminar Alumno del Cursado" onclick="cursadoEliminarAlumno(`+alumno+`,`+idMateria+`,`+idCarrera+`,`+idProfesor+`)">
                                              <img src="../assets/img/icons/delete_icon.png" width="21">
                                          </a>`;
                   let fila = `<tr>
                                  <td>`+datos_alumno.data[0].apellido+`, `+datos_alumno.data[0].nombre+` <strong>(`+datos_alumno.data[0].id+`)</strong></td>
                                  <td>`+datos_alumno.data[0].email+`</td>
                                  <td>`+datos_alumno.data[0].telefono+`</td>
                                  <td>`+datos_alumno.data[0].dni+`</td>
                                  <td><span class="badge badge-info">`+datos_alumno.data[0].cursado+`</span></td>
                                  <td>&nbsp;`+accion_eliminar+`&nbsp;</td>
                              `;
                   $("#tabla_alumnos_cursando>tbody").prepend(fila);
                 } else {
                   $("#resultado_carga").html(`<div class="alert alert-dark" role="alert"><img src="../assets/img/icons/error_icon.png" width="22">&nbsp;<i><span style="color: #000000;">
                   No se pudo recuperar los datos del Alumno.</span></i>
                    </div>`);
                 }                                            
             } else {
                 $("#resultado_carga").html(`<div class="alert alert-dark" role="alert"><img src="../assets/img/icons/error_icon.png" width="22">&nbsp;<i><span style="color: #000000;">
                                            `+obj.data+`</span></i>
                                             </div>`);
             }
     });
 }
 
 //****************************************************************************
 //DESVINCULA UN ALUMNO DE UNA MATERIA ESPECIFICADA
 //****************************************************************************
 function cursadoEliminarAlumno(idAlumno,idMateria,idCarrera,idProfesor) {
     let alumno_nombre = sacaNombreAlumnoPorId(idAlumno);
     if(confirm("Desvincular de la materia a "+alumno_nombre+' ?')) {
        
        $.post('../funciones/deleteAlumnoEnMateria.php', {"materia":idMateria,"alumno":idAlumno}, function(data){
            let obj = JSON.parse(data);
            if (obj.codigo==100) {
             cargarAlumnos(idCarrera, idMateria, idProfesor, 'cursado');
             $("body #resultado_carga").removeClass('d-none');
             $("#resultado_carga").append(`<div class="alert alert-success" role="alert"><img src="../assets/img/icons/ok_icon.png" width="20">&nbsp;<b>Atenci&oacute;n:&nbsp;</b><i>
                El Alumno <b>`+alumno_nombre+`</b> fue desvinculado de la Materia.</i>
                </div>`);
            } else {
                $("#resultado_carga").html(`<div class="alert alert-dark" role="alert"><img src="../assets/img/icons/error_icon.png" width="22">&nbsp;<i><span style="color: #000000;">
                `+obj.data+`</span></i>
                </div>`);
            }
        })
     }
 }
 