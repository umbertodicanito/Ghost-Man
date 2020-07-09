var dx = 10
var descNormal="In the normal game mode the ghost have to take the coin with the same color of the ghost";
var descHard="In the normal game mode the ghost have to take the coin with the same color of the ghost. Speed is max";
var descCrazy="In the normal game mode the ghost have to take the coin with the same color of the ghost. Speed is max. Character color will change every few seconds randomly";

setInterval(function(){
    //make the images move
    var imageUp = document.getElementById("imageBackgroundUp")
    var imageDown = document.getElementById("imageBackgroundDown")

    var currentXUp = parseInt(imageUp.style.marginLeft.slice(0,-2))

    var currentXDown = parseInt(imageDown.style.marginLeft.slice(0,-2))

    imageUp.style.marginLeft = (currentXUp + dx ) + "px"
    imageDown.style.marginLeft = (currentXDown - 2*dx) + "px"

    //reset images
    if(currentXDown<-255){
        imageDown.style.marginLeft = (currentXDown + screen.width + 249) + "px"
    }

    if(currentXUp>screen.width){
        imageUp.style.marginLeft = "-168px"
    }
    
},50)

setTimeout(function(){
    document.getElementById("newGameNormal").onclick = function(){
        startGame(0);
        window.location.href = "chooseColor.html";
        playClickForward();
    }
    document.getElementById("newGameHard").onclick = function(){
        startGame(1);
        window.location.href = "chooseColor.html";
        playClickForward();
    }
    document.getElementById("newGameCrazy").onclick = function(){
        startGame(2);
        window.location.href = "chooseColor.html";
        playClickForward();
    }
    document.getElementById("scoresBtn").onclick = function(){
        window.location.href = "scoresPage.html";
        playClickForward();
    }
    initColorAndPosition()
    
},100)

function showDescNorm (){ 
    document.getElementById("gameDescDiv").style.display="block";
    document.getElementById("gameDescDiv").innerHTML=descNormal;
}

function showDescHard (){ 
    document.getElementById("gameDescDiv").style.display="block";
    document.getElementById("gameDescDiv").innerHTML=descHard;
}

function showDescCrazy (){ 
    document.getElementById("gameDescDiv").style.display="block";
    document.getElementById("gameDescDiv").innerHTML=descCrazy;
}

function hiddenDescDiv (){ 
    document.getElementById("gameDescDiv").style.display="none";
}
