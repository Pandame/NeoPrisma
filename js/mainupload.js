var scene, camera, renderer;
var val = 4;
colorBack = 0x000000;
init();

/******** C U B E *******/
var cubeGeometry = new THREE.CubeGeometry(10, 10, 10); // on créé le cube et ses dimensions.
var cubeTexture = THREE.ImageUtils.loadTexture('TD/moon.jpg'); // on initialise la textures des faces, elles seront initialement composée de l'image TD/moon.jpg

/*  V I D E O */
var updateFcts = [];
/*
var mavariable = document.getElementById("varJsToPhp").value;
console.log(mavariable);
var source = "upload/"+mavariable;
console.log(source);
var sourceQuote = "'"+source+"'";
console.log(sourceQuote);
var videoTexture = new THREEx.VideoTexture(sourceQuote);
var video = videoTexture.video;
*/
var mavariable = new String(document.getElementById("varJsToPhp").value);
var source = "upload/"+mavariable;
var videoTexture = new THREEx.VideoTexture(source);
var video = videoTexture.video;


	
video.crossOrigin = 'anonymous'; // cela permet d'importer des vidéos non reconnues, pour qu'elles ne soient pas mises comme danger.

updateFcts.push(function(delta, now){
	   // to update the texture are every frame
    videoTexture.update(delta, now)
});

// Pour les 6 faces du pavé / cube
var materials = [];
materials.push(new THREE.MeshBasicMaterial({map : videoTexture.texture})); // face vidéo
materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffff00 })); //left où on applique une image avec cubeTexture
materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffffff })); //top
materials.push(new THREE.MeshLambertMaterial({ color: 0x00ffff })); //bottom où on applique une simple couleur avec color:
materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xBCB600 })); //front
materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xBCB600 })); //back

var cubeMaterial = new THREE.MeshFaceMaterial(materials);
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0,0,0);
cube.rotation.set(0,0,0);
scene.add(cube); // on ajoute le cube à la scène

updateFcts.push(function(){
renderer.render( scene, camera );});

var lastTimeMsec= null // permet de mettre à jour pour la vidéo
requestAnimationFrame(function animate(nowMsec){
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	// call each update function
	
	updateFcts.forEach(function(updateFn){
		updateFn(deltaMsec/1000, nowMsec/1000)
	});
});

animate();




/*///////////////////////////////
/////////////////////////////////

******* F O N C T I O N  ********

/////////////////////////////////
///////////////////////////////*/


/*******************************************
************** MENU HAMBURGER **************
*******************************************/


function textSliderX(val) {
	document.getElementById('sliderPositionX').value=val;
	val=parseInt(val); 
	cube.position.x = val;
}

function textSliderY(valY) {
	document.getElementById('sliderPositionY').value=valY;
	valY=parseInt(valY); 
	cube.position.y = valY;
}

function textSliderZ(valZ) {
	document.getElementById('sliderPositionZ').value=valZ;
	valZ=parseInt(valZ); 
	cube.position.z = valZ;
}



var btnAmpoule = document.getElementById('ampoule');
btnAmpoule.addEventListener('click', fctAmpoule);

function fctAmpoule() {
	if (colorBack==0xFFFFFF) {
		colorBack=0x000000;

		document.getElementById("ampoule").src="./css/img/lightOff.png";

		renderer.setClearColorHex(colorBack, 1);
	} else {
		colorBack = 0xffffff;
		renderer.setClearColorHex(colorBack, 1);
		document.getElementById("ampoule").src="./css/img/lightOn.png";
	}
}

var btnInitialiser = document.getElementById('initialiser');
btnInitialiser.addEventListener('click', fctInitialiser);

function fctInitialiser() {
	camera.position.set(0,0,100);
	cube.rotation.set(0,0,0);
	cube.position.set(0,0,0);
}

/*******************************************
*********** INITIALISATION *****************
*******************************************/

function init() { // fonction initialisant la scène et la caméra

	scene = new THREE.Scene();

    // Create a renderer and add it to the DOM.
  
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // On crée une caméra que l'on position et que l'on ajoute à la scène.
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000);
    camera.position.set(0,0,100);
    scene.add(camera);

  	window.addEventListener('resize', function() {

        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
  	
  	renderer.setClearColorHex(colorBack, 1); // on met une couleur de fond
  
    var light = new THREE.PointLight(0xffffff); // on ajoute une lumière de couleur blanche 
    light.position.set(-20,20,0);
    scene.add(light); // on ajoute light (la lumière) à la scene

    var light2 = new THREE.PointLight(0xffffff);
    light2.position.set(0,0,12);
    scene.add(light2);

    var light3 = new THREE.PointLight(0xffffff);
    light3.position.set(0,0, -20);
    scene.add(light3);

    var light4 = new THREE.PointLight(0xffffff);
    light4.position.set(0,-100,0);
    scene.add(light4);

    controls = new THREE.OrbitControls(camera, renderer.domElement); // permet de bouger la caméra et dézoomer avec une souris
} 

/*******************************************
*************** ANIMATION ******************
*******************************************/

function animate() { // fonction permettant de faire le rendu, et de redemander une mise a jour avec la vidéo.	    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

/*******************************************
*********** FULLSCREEN MODE ****************
*******************************************/

document.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    toggleFullScreen();
  }
}, false);

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
  	document.getElementById('popup').innerHTML="";
  	$(function(){
		$('#popup').hide().fadeIn(2000);
	});
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();

    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
  	document.getElementById('popup').innerHTML="";

    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

$(function(){
		$('#popup').hide().fadeIn(2500);
});








