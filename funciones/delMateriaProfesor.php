<?php
	set_include_path('../../conexion'.PATH_SEPARATOR.'../../app/lib');

	include_once 'seguridadNivel2.php';
	include_once 'conexion.php';
	include_once 'Sanitize.class.php';
	
	$idMateria = (isset($_POST['materia']) && $_POST['materia']!=NULL)?SanitizeVars::INT($_POST['materia']):false;
	$idProfesor = (isset($_POST['profesor']) && $_POST['profesor']!=NULL)?SanitizeVars::INT($_POST['profesor']):false;
	
	$anioActual=date('Y');
	
	
	$array_resultados = array();
	if ($idProfesor && $idMateria) {
		$sql = "DELETE FROM profesor_dicta_materia 
		        WHERE idProfesor = $idProfesor and 
				      idMateria = $idMateria";
		$resultado = mysqli_query($conex,$sql);
		if ($resultado) {
			 $array_resultados['codigo'] = 100;
			$array_resultados['data'] = "La Materia fue desviculada del profesor exitosamente.";
		} else {
			$array_resultados['data'] = "Hubo un Error en la desvinculaci&oacute;n de la materia.";
		}
	} else {
			$array_resultados['codigo'] = 13;
			$array_resultados['data'] = "Faltan Datos para realizar la desvinculaci&oacute;n. ";
	}
	echo json_encode($array_resultados);

?>
