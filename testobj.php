<!DOCTYPE HTML>
<html>
    <head>
	    <title> Vidéo scale </title>
	    <script src="js/three.min.js"></script>
		<script src="js/OrbitControls.js"></script> 
		<script src='js/threex.videotexture.js'></script>
		<script src='TD/MTLLoader.js'></script>
		<script src='TD/OBJMTLLoader.js'></script>
		<script src='js/ColladaLoader.js'></script>
		<script src='js/threex.dynamictexture.js'></script>
		<link rel="stylesheet" href="css/styles.css">

		<!-- Big thanks to takien who let people use his jPushMenu : https://github.com/takien/jPushMenu You save me guy :)-->
		<link rel="stylesheet" type="text/css" href="css/jPushMenu.css" /> <!-- Pour le menu -->

		<!--load jQuery, required-->
		<script src="js/jquery-1.11.1.min.js"></script>
		<!--load jPushMenu, required-->
		<script src="js/jPushMenu.js"></script>
		

		<!--call jPushMenu, required-->
		<script>
		jQuery(document).ready(function($) {
			$('.toggle-menu').jPushMenu();
		});
		</script>

		<meta charset="utf-8"> 

	</head>
  
    <body>
    <img src="css/img/hamburger.png" id="hamburger" class="toggle-menu menu-left" alt="">
    <nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left">
	
	

	    <div id="onscreen">
	   		<img src="css/img/lightOff.png" id="ampoule">
	   		<img src="css/img/reload.png" id="initialiser">
	   		
	   		<p class="positionFont">Position X</p>
			<div id="slider-range-min"></div>
			<input id="sliderPositionX" class="sliderPosition" type="range" min="-100" max="100" onchange="val=this.value">
			<p class="positionFont">Position Y</p>
			<input id="sliderPositionY" class="sliderPosition" type="range" min="-100" max="100"  onchange="valY=this.value">
			<p class="positionFont">Position Z</p>
			<input id="sliderPositionZ" class="sliderPosition" type="range" min="-100" max="100"  onchange="valZ=this.value">
			<p class="positionFont">Taille de l'objet</p>
			<input id="sliderSize" class="sliderPosition" type="range" min="1" max="10"  onchange="valSize=this.value">
		
			<form method="post" action="" enctype="multipart/form-data">     
				<input type="hidden" name="MAX_FILE_SIZE" value="20971520">  
				<input type="file" name="nom"> 
				<input type="submit" name="submit" value="Envoyer">    
			</form>

			<?php 
				$filename = $_FILES['nom']['name'];
				$fileTmpLoc = $_FILES['nom']['tmp_name'];
				$pathAndName = "upload/".$filename;
				$moveResult = move_uploaded_file($fileTmpLoc, $pathAndName);
				if ($moveResult == true) {
			    echo "File has been moved from " . $fileTmpLoc . " to " . $pathAndName."<br/>";
				} else {
				     echo "ERROR: File not moved correctly <br/>";
				}
			?>

			<input type="hidden" id="varJsToPhp" value="<?php echo $filename; ?>">   

		</div>
	</nav>

		<div id="webgl">
	    		<div id="popup" style="display:none">
		    		<p id="explain">Press enter to go full screen</p>
		    		<img id="enter" src="css/img/enter.png" alt="">
	    		</div>
    		

				

			<!--	var btnHamburger = document.getElementById('hamburger');
				btnHamburger.addEventListener('click', fctHamburger);
				var menuClick = 0;

				function fctHamburger() {
					menuClick++;
					if (menuClick%2==1) {
					document.getElementById('hamburger').src="css/img/cross.png";
					document.getElementById('hamburger').style.paddingTop="28px";

					} else  {
						document.getElementById('hamburger').src="css/img/hamburger.png";
						document.getElementById('hamburger').style.paddingTop="34px";
					}

				}*/-->
		
		<script src="js/mainuploadobject.js"></script></div>
		</div> <!-- Fin div webgl -->
		
			
	</body>
</html>
