var coins = []
var coinsAngle = []
var meshParent
var iCoin = 0;
var deltaX = 0;
var currentAngle = 0;
var iterAngle = 0

//coins positions
var posLeft=-1.8;
var posMidLeft=-0.6;
var posMidRight=0.6;
var posRight=1.8;

var positionCoinY=[posRight, posMidRight, posMidLeft, posLeft];

var coin = function(parent){
    meshParent = parent
}

var newCoin = function(colorCoin){
    var texture = new THREE.TextureLoader().load('../images/pacmanTexture.png')
    texture.minFilter = THREE.LinearFilter;
    var geometryCoin = new THREE.CylinderBufferGeometry( 0.12, 0.12, 0.05, 30, 1);
    var materialCoinBase = new THREE.MeshToonMaterial({color: colorCoin, side:THREE.DoubleSide, map: texture});
    var materialCoinSide = new THREE.MeshToonMaterial({color: colorCoin});
    materialCoinBase.minFilter = THREE.LinearFilter;
    var meshCoin = new THREE.Mesh(geometryCoin, [materialCoinSide, materialCoinBase, materialCoinBase]);
    meshCoin.name = iCoin.toString()
    

    iCoin++

    return meshCoin;
}

var animateCoin = function(){

    coins.forEach((obj) => {
        obj.rotation.y = meshParent.rotation.x
        obj.rotation.x += 0.021
    });
    
    for(var i = 0; i<coinsAngle.length; i++){
        coinsAngle[i] += speed
    }

    deltaX += speed
    currentAngle += speed;
    if(deltaX > Math.PI/6){
        generateOneCoin()
        deltaX = 0
    }

    //collision
    if(coinsAngle.length > 0){
        if(coinsAngle[iterAngle] > 1.25 && coinsAngle[iterAngle] < 1.35){
            var y = coins[iterAngle].position.y
            var iy = positionCoinY.indexOf(y)
            if(iy == getGhostPositionX()){
                checkColorCollision(coins[iterAngle])
            }
            iterAngle++
        }
    }
}

function checkColorCollision(singleCoin){
    if(meshWireBody.material.color.r == singleCoin.material[0].color.r && 
       meshWireBody.material.color.g == singleCoin.material[0].color.g &&
       meshWireBody.material.color.b == singleCoin.material[0].color.b){
        
        singleCoin.material[0].visible = false
        singleCoin.material[1].visible = false
        singleCoin.material[2].visible = false
        increaseScore(speed)
        playCoinPicked()

    }else{
        pauseGame()
        playWrongCoinPicked()
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        popupDeath();
    }
}

function generateOneCoin(){
    var r = getNextCoin()
    var y = positionCoinY[r[1]];

    var meshSingleCoin = newCoin(r[0])
    meshSingleCoin.position.set(4.2*Math.cos(currentAngle+Math.PI/8),y,-4.2*Math.sin(currentAngle+Math.PI/8));
    
    meshSingleCoin.rotation.y = meshParent.rotation.x
    
    meshParent.add(meshSingleCoin);
    coins.push(meshSingleCoin);
    coinsAngle.push(0)


    checkCoinArray()
}

function checkCoinArray(){
    if(coins.length>=5){
        var toBeDeleted = coins.shift()
        removeCoin(toBeDeleted)
        coinsAngle.shift()
        iterAngle--
    }
}

function removeCoin(c){
    var selectedObject = meshParent.getObjectByName(c.name);
    meshParent.remove( selectedObject );
}
