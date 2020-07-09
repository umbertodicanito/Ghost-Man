//variables used for animation
var armsDirection = true
var isMoving = false
var movingRight = false
var deltaMovementX = 0

//body components plus others
var meshWireBody
var meshBody
var meshHead 
var meshWireHead
var meshArm1
var meshArm2
var meshWireArm1
var meshWireArm2
var group
var targetSpotlight
var currentTrackGround = 2
var ghostLights = []
var meshToken

var ghost = function(scene, colorGhost){
    var armDirection = true;
    var colorBodyGhost = 0x006565

    group = new THREE.Group();

    colorBodyGhost = getGhostBodyColor(colorGhost)

    targetSpotlight = new THREE.Object3D()
    scene.add(targetSpotlight)

    for(var i=0; i<4; i++){
        ghostLights.push(newLigth(i))
    }

    //body construction
    var radiusTop= 2;
    var radiusBottom= 2.65;
    var heightBody=4;
    var radialSegments=8;
    var heightSegments=1; 

    var geoBody = new THREE.CylinderBufferGeometry( radiusTop, radiusBottom, heightBody, radialSegments, heightSegments, true)
    var geoWireBody = new THREE.WireframeGeometry(geoBody);

    var matWireBody = new THREE.LineBasicMaterial({color: colorGhost, linewidth: 10 });
    var matBody = new THREE.MeshToonMaterial({color: colorBodyGhost,
                                              polygonOffset: true,
                                              polygonOffsetFactor: 1,
                                              polygonOffsetUnits: 1});

    meshWireBody = new THREE.LineSegments(geoWireBody, matWireBody)
    meshBody = new THREE.Mesh(geoBody, matBody)

    group.add(meshBody)
    group.add(meshWireBody)

    //head
    var radiusHead = 2
    var geoHead = new THREE.SphereBufferGeometry(radiusHead,8,4,0.0,6.3,0.0,Math.PI/2)
    var geoWireHead = new THREE.WireframeGeometry(geoHead);

    var matWireHead = new THREE.LineBasicMaterial({color: colorGhost, linewidth: 10 });
    var matHead = new THREE.MeshToonMaterial({color: colorBodyGhost,
                                              polygonOffset: true,
                                              polygonOffsetFactor: 1,
                                              polygonOffsetUnits: 1});

    meshHead = new THREE.Mesh(geoHead, matHead)
    meshWireHead = new THREE.LineSegments(geoWireHead, matWireHead)

    //arms
    var geoArm = new THREE.CylinderBufferGeometry(0.5,0.5,2,6,1)
    var geoWireArm = new THREE.WireframeGeometry(new THREE.CylinderBufferGeometry(0.5,0.5,2,6,1,true))

    var matArm = new THREE.MeshToonMaterial({color: colorBodyGhost,
                                             polygonOffset: true,
                                             polygonOffsetFactor: 1,
                                             polygonOffsetUnits: 1});
    var matWireArm = new THREE.LineBasicMaterial({color: colorGhost, linewidth: 10 });

    meshArm1 = new THREE.Mesh(geoArm, matArm)
    meshArm2 = new THREE.Mesh(geoArm, matArm)
    meshWireArm1 = new THREE.LineSegments(geoWireArm, matWireArm)
    meshWireArm2 = new THREE.LineSegments(geoWireArm, matWireArm)

    //token
    var geoToken = new THREE.PlaneGeometry( 2, 2);
    var texture = new THREE.TextureLoader().load('../images/blinky.png')
    texture.minFilter = THREE.LinearFilter;
    var matToken = new THREE.MeshToonMaterial({color:0xffffff, side:THREE.DoubleSide, map:texture, alphaTest: 0.5})
    meshToken = new THREE.Mesh(geoToken, matToken)

    //adjustments
    meshHead.position.y = heightBody - radiusHead
    meshWireHead.position.y = heightBody - radiusHead

    meshArm1.position.y = meshHead.position.y - radiusHead * 3/4
    meshArm2.position.y = meshHead.position.y - radiusHead * 3/4

    meshWireArm1.position.y = meshArm1.position.y
    meshWireArm2.position.y = meshArm2.position.y

    meshArm1.position.x = radiusTop
    meshArm2.position.x = -radiusTop

    meshWireArm1.position.x = meshArm1.position.x
    meshWireArm2.position.x = meshArm2.position.x

    meshArm1.rotation.z = -Math.PI*0.75
    meshArm2.rotation.z = Math.PI*0.75

    meshWireArm1.rotation.z = meshArm1.rotation.z
    meshWireArm2.rotation.z = meshArm2.rotation.z

    meshToken.position.y = 5.5*heightBody

    //adding to the scene
    meshBody.add(meshHead)
    meshBody.add(meshArm1)
    meshBody.add(meshArm2)

    meshWireBody.add(meshWireHead)
    meshWireBody.add(meshWireArm1)
    meshWireBody.add(meshWireArm2)

    group.add(meshToken)

    ghostLights.forEach((obj) => {
        meshBody.add(obj)
    });

    group.scale.set(0.085,0.085,0.085)
    meshBody.rotation.x = 0.5 
    meshWireBody.rotation.x = 0.5 

    setCurrentGhostLight(currentCharacter)

    scene.add(group)

    return;
}

var goDownToken = function(idColor){
    var texture
    switch(idColor){
        case RED:
            texture = new THREE.TextureLoader().load('../images/blinky.png')
            break;
        case YELLOW:
            texture = new THREE.TextureLoader().load('../images/clide.png')
            break;
        case PINK:
            texture = new THREE.TextureLoader().load('../images/pinky.png')
            break;
        default:
            texture = new THREE.TextureLoader().load('../images/inky.png')
            break;
    }
    meshToken.material.map = texture
    
    var goDownInterval = setInterval(function(){
        meshToken.position.y -= 0.035
        if(meshToken.position.y <= 4.5){
            clearInterval(goDownInterval)
            meshToken.position.y = 5.5 * 4
        }
    },10)
}

var newLigth = function(c){
    //light below the ghost
    var ghostLight = new THREE.SpotLight(getColorCode(c))
    ghostLight.position.set(0,-0.175,0.175)
    ghostLight.shadow.mapSize.width = 1024
    ghostLight.shadow.mapSize.height = 1024
    ghostLight.angle = Math.PI/3
    ghostLight.penumbra = 0.15
    ghostLight.intensity = 0
    ghostLight.target = targetSpotlight
    return ghostLight
}

var setCurrentGhostLight = function(index){
    for(var i = 0; i<4; i++){
        ghostLights[i].intensity = 0
    }
    ghostLights[index].intensity = 2
}

var animateGhost = function(){

    //standard animation
    if(armsDirection && meshArm1.rotation.x<0.5){
        meshArm1.rotation.x += 0.025
        meshArm2.rotation.x -= 0.025
        meshWireArm1.rotation.x += 0.025
        meshWireArm2.rotation.x -= 0.025
        meshHead.rotation.y += 0.020
        meshWireHead.rotation.y += 0.020
        meshWireBody.position.y += 0.0035
        meshBody.position.y += 0.0035

    }
    else if(armsDirection)
        armsDirection = false

    if(!armsDirection && meshArm1.rotation.x>-0.5){

        meshArm1.rotation.x -= 0.025
        meshArm2.rotation.x += 0.025
        meshWireArm1.rotation.x -= 0.025
        meshWireArm2.rotation.x += 0.025
        meshHead.rotation.y -= 0.020
        meshWireHead.rotation.y -= 0.020
        meshWireBody.position.y -= 0.0035
        meshBody.position.y -= 0.0035

    }
    else if(!armsDirection)
        armsDirection = true

    //token rotation
    meshToken.rotation.y += 0.02
    
    //changing track
    if(isMoving)
    {
        if(deltaMovementX <= 1.2){
            deltaMovementX += 0.12
            if(movingRight)
                translateGhostX(0.12)
            else
                translateGhostX(-0.12)
        }else{
            deltaMovementX = 0
            isMoving = false
        }
    }
    return;
}

var getGhostPositionX = function(){
    return currentTrackGround
}


function moveGhostX(direction){
    if(direction == "left"){
        if(currentTrackGround>0 && !isMoving){
            isMoving = true
            movingRight = false
            currentTrackGround-- 
        }
    }else{
        if(currentTrackGround<3 && !isMoving){
            isMoving = true
            movingRight = true
            currentTrackGround++
        }
    }
}

var getGhostBodyColor = function(codeColor){
    //returning the body color
    switch(codeColor){
        case 0xf9ff00:
            return 0x8E9200
            break;
        case 0xff0000:
            return 0x920000
            break;
        case 0x00ffff:
            return 0x006565
            break;
        default:
            return 0xFF6BC0
            break;
    }
}

var setGhostColor = function(newColor){
    codeColor = getColorCode(newColor)
    codeColorBody = getGhostBodyColor(codeColor)
    //updating colors components
    meshWireBody.material.color.setHex(codeColor)
    meshBody.material.color.setHex(codeColorBody)
    meshHead.material.color.setHex(codeColorBody)
    meshWireHead.material.color.setHex(codeColor)
    meshArm1.material.color.setHex(codeColorBody)
    meshArm2.material.color.setHex(codeColorBody)
    meshWireArm1.material.color.setHex(codeColor)
    meshWireArm2.material.color.setHex(codeColor)

    setCurrentGhostLight(newColor)
}

var translateGhostX = function(deltaX){
    group.position.x += deltaX
    targetSpotlight.position.x += deltaX 
    return;
}

var translateGhostY = function(deltaY){
    group.position.y += deltaY
    return;
}

var translateGhostZ = function(deltaZ){
    group.position.z += deltaZ
    return;
}