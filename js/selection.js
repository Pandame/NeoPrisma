window.onload = function() {
  var scene, camera, renderer;
var val = 4;
colorBack = 0x000000;
var keyboard = new THREEx.KeyboardState();
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight; 
var posx = 0, posy = 0, posz=0 ;  
var container = document.getElementById("webgl");
  var renderer = new THREE.WebGLRenderer({clearColor:0x777777,clearAlpha:1});
      renderer.setClearColorHex(0x777777,1) ;

  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  container.appendChild( renderer.domElement );  
  THREEx.WindowResize(renderer, camera);



/*******************************************
*********** INITIALISATION *****************
*******************************************/

//function init() { // fonction initialisant la scène et la caméra

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

    THREEx.WindowResize(renderer, camera);
  
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    var dae ;
    var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        loader.load( 'lego.DAE', function ( collada ) {
          dae = collada.scene;
          dae.scale.x = dae.scale.y = dae.scale.z = 20.0;
          dae.position.set(posx,posy, posz);
          dae.updateMatrix();
          //brasd = dae.getObjectByName("bras_droit", true);
          //brasg = dae.getObjectByName("brad_gauche", true);
          scene.add(dae);
        } );

        var clickInfo=[];
        clickInfo.userHasClicked = false;
        //var raycaster = new THREE.Raycaster();
        //var projector = new THREE.Projector();  
        container.addEventListener('click',function(evt) {
            clickInfo.userHasClicked = true;
            clickInfo.x = evt.clientX-container.offsetLeft;
            clickInfo.y = evt.clientY-container.offsetTop;
          }, false);
   
            
animate();


/*******************************************
*************** ANIMATION ******************
*******************************************/

function animate() { // fonction permettant de faire le rendu, et de redemander une mise a jour avec la vidéo.	    

    if (clickInfo.userHasClicked) {
        var raycaster = new THREE.Raycaster();
        var projector = new THREE.Projector();  
        
        var directionVector = new THREE.Vector3(
        ( clickInfo.x / window.innerWidth ) * 2 - 1,
        -( clickInfo.y / window.innerHeight ) * 2 + 1,
        1);

        document.getElementById("titi").value = directionVector.x + '  ,  ' + directionVector.y;
        clickInfo.userHasClicked=false;
        projector.unprojectVector(directionVector, camera);
        directionVector.sub(camera.position);
        directionVector.normalize();
        raycaster.set(camera.position, directionVector);
        var intersects = raycaster.intersectObjects(scene.children, true);
        console.log(intersects);
        if (intersects.length>0) {
            var target=intersects[0].object;
          i=1;
          while (target.visible==false && i<intersects.length) {
            target=intersects[i].object;
            i++;
          } 
          if (i<intersects.length) {
            document.getElementById("titi").value = 'Objet cliqué: ' + target.name;
          }
        } 
      }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  //  controls.update();

    
       
       
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

animate();
}








