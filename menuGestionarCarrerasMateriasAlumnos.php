<?php
   include_once "seguridadNivel2.php";
   //echo $_SESSION['idProfesor'];die;
   $id_pagina = 'carreras';
?>

<!doctype html>
<html lang="es">
  <head>
  <?php
      include_once('../app/views/header.html');
  ?>

</head>


<body>
  <!-- NAVBAR -->
  <header>
    <?php include("navbar.php");?>
  </header>

  <article>
    <div id="breadcrumb">
      
      <nav aria-label="breadcrumb" role="navigation">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#" onclick="cargarHome()">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Carreras</li>
                </ol>
      </nav>

      <h1><i>&nbsp;Carreras</i></h1>
      <h3>&nbsp;Gestionar Examenes Finales de Alumnos</h3>

    </div>
  </article>

  <article class="container-fluid">
    <div id="control_habilitado" style='display:none'></div>
    <div id="cargar_regularidades_habilitado" style='display:none'></div>
    <div id="titulo"></div>
    <hr>
  </article>

  <article class="container">
       <section>
           <div class="row" id="resultado">

                  <div class="col-md-4">
                        <div class="card" style="width: 18rem;">
                                  <img src="../public/assets/img/logo_n.jpg" class="card-img-top">
                                  <div class="card-body">
                                      <h5 class="card-title"><img src="../public/assets/img/icons/add2_icon.png" width="23">&nbsp;Nueva vinculación a Carrera</h5>
                                          <h6 class="card-subtitle mb-2 text-muted"></h6>
                                      <p class="card-text"></p>
                                      <button class="btn btn-primary btn-block" onclick="vincularCarrera(`+idProfesor+`)">Vincularme</button>
                                  </div>
                        </div>
                  </div>


           </div><!-- Cierra Row-->
           <div class="row" id="controles"></div><!-- Cierra Row-->
        </section>
  </article>

<!-- FOOTER -->
<?php
      include_once('../app/views/footer.html');
  ?>

<!-- JAVASCRIPT LIBRARIES-->
<?php include("../app/views/script_jquery.html");?>

<!-- JAVASCRIPT CUSTOM -->

<script src="./js/funciones.js"></script>
<script src="./js/gestionarCursado.js"></script>
<script>
   let carrera_nombre = '';
   let carrera_id = '';
   let profesor_id = '<?=$_SESSION['idProfesor'];?>';
   var materia_nombre = '';
   var materia_id = '';
   var opcion = 'cursado';
   let llamado_numero = '';

   function expired() {
      location.href = "./logout.php";
   }



   $(function () {
      cargarCarreras(profesor_id);
   });

   setTimeout(expired, 60000*20);

</script>



</body>
</html>
