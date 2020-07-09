var speed = 0.003
var inGame = false
var nextColor = null
var prevTime = 0
var isDescending = false
var timeInGame = 0
var prevTokenTime = 0

// S C E N E
var scene = new THREE.Scene();
var sceneStar = new THREE.Scene();

// L I G H T S
var light = new THREE.DirectionalLight(0xffffff,0.9)
light.position.y = 4
light.position.z = 10
var mainLightTarget = new THREE.Object3D()
mainLightTarget.position.y = -1
scene.add(mainLightTarget)
light.target = mainLightTarget
scene.add(light);

// R E N D E R E R of ground
var rendererGround = new THREE.WebGLRenderer({antialias: true} );
rendererGround.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( rendererGround.domElement );


// C A M E R A
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.x = 0;
camera.position.y = 3.5; //originally 3.5
camera.position.z = 6; //6
camera.lookAt(0,3,0); //0.3.0

//stars
starsGenerator(sceneStar)
//ground
var meshGround = ground(scene)
//ghost
ghost(scene, getGhostColorCode())
translateGhostZ(3.25)
translateGhostY(2.75)
translateGhostX(posMidRight)
//coins
coin(meshGround)

// G E N E R A L  F U N C T I O N S
// this function is used to animate all the scene
var animate = function (time) {
    //y=0.0001416677x+0.003
    time = time * 0.001
    deltaTime = time - prevTime
    prevTime = time
    
    if(inGame && deltaTime!=null)
        timeInGame += deltaTime
    
    if(!isNaN(time) && time<=120 && inGame && currentDifficulty==NORMAL)
        speed = 0.0001416677 * timeInGame + 0.003
    else if(!isNaN(time) && inGame){
        speed = 0.020
        if(currentDifficulty == CRAZY){
            if(nextColor == null){
                nextColor = getNextColor()
                prevTokenTime = time
            }
            else if(time-prevTokenTime > nextColor[0]){
                setGhostColor(nextColor[1])
                currentCharacter = nextColor[1]
                isDescending = false
                nextColor = getNextColor()
                prevTokenTime = time

            }else if(time-prevTokenTime >= nextColor[0] - 5 && !isDescending){

                goDownToken(nextColor[1])
                isDescending = true
            }
        }
    }
    requestAnimationFrame( animate );

    //rotating the ground
    meshGround.rotation.x += speed; //from 0.003 to 0.020 max

    animateStars()
    animateGhost()
    animateCoin()

    rendererGround.autoClear = true;
    rendererGround.render(scene, camera);

    rendererGround.autoClear = false
    rendererGround.render(sceneStar, camera);

};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rendererGround.setSize(window.innerWidth, window.innerHeight);
}

function moveGhost(){

    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.key) {
            case "Left": // IE/Edge specific value
            case "ArrowLeft":
            case "a":
            case "A":
                if(inGame)
                    moveGhostX("left")
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
            case "d":
            case "D":    
                if(inGame)
                    moveGhostX("right")
                break;
            case "Esc": // IE/Edge specific value
            case "Escape":
                if(inGame){
                    pauseGame()
                    popupPause()  
                }
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);
}

animate();
moveGhost();

window.addEventListener("resize", onWindowResize, false);


function pauseGame(){
    speed = 0
    inGame = false
}


function popupPause(){
    backgroundMusic.volume=0.3;

    // Get the modal
    var popup = document.getElementById("myPopupPause");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the popup
    popup.style.display = "block";


    // When the user clicks on <span> (x), close the popup
    span.onclick = function() {
        popup.style.display = "none";
        backgroundMusic.volume=0.7;
        inGame = true
    }

    //go to homepage
    document.getElementById("btnHome").onclick = function(){
        gameFinished()
        location.href='../html/index.html';
        backgroundMusic.stop();
    }
}


function popupDeath(){

    // Get the modal
    var popup = document.getElementById("myPopupDeath");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the popup
    popup.style.display = "block";

    //go to homepage
    document.getElementById("btnHomeLose").onclick = function(){
        gameFinished()
        location.href='../html/index.html';
        backgroundMusic.stop();
    }

    // this restarts the match with same character
    document.getElementById("btnRestart").onclick = function(){
        gameFinished()
        location.href='../html/ingame.html';
    }
}


window.onload = function(){
    pauseGame()
    
    // Get the modal
    var popup = document.getElementById("myPopupInitGame");

    var startGame = document.getElementById("btnPlay");

    document.getElementById("btnPlay").onclick = function(){
        inGame = true;
        popup.style.display = "none";
        playBackground();

    }
}
