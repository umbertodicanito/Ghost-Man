var oldChar = RED;

function deactiveOldChar(){
    var oldCharString = "char" + oldChar.toString();
    document.getElementById(oldCharString).classList.remove("selected")
}

setTimeout(function(){

    document.getElementById("char0").onclick = function(){
        if(characterChoosen != RED){
            characterChoosen(RED)
            deactiveOldChar()
            document.getElementById("char0").classList.add("selected")
            oldChar = RED
        }
        playClickForward();
    }

    document.getElementById("char1").onclick = function(){
        if(characterChoosen != YELLOW){
            characterChoosen(YELLOW)
            deactiveOldChar()
            document.getElementById("char1").classList.add("selected")
            oldChar = YELLOW
        }
        playClickForward();
    }

    document.getElementById("char2").onclick = function(){
        if(characterChoosen != PINK){
            characterChoosen(PINK)
            deactiveOldChar()
            document.getElementById("char2").classList.add("selected")
            oldChar = PINK
        }
        playClickForward();
    }

    document.getElementById("char3").onclick = function(){
        if(characterChoosen != BLUE){
            characterChoosen(BLUE)
            deactiveOldChar()
            document.getElementById("char3").classList.add("selected")
            oldChar = BLUE
        }
        playClickForward();
    }

    document.getElementById("startGameBtn").onclick = function(){
        setPlayerName(document.getElementById("namePlayerInput").value);
        playClickForward();
        location.href='../html/ingame.html';
    }

    document.getElementById("char0").click()
},100)

setInterval(function(){
    if(document.getElementById("namePlayerInput").value == null || 
       document.getElementById("namePlayerInput").value == ""){
        document.getElementById("startGameBtn").style.visibility = "hidden"
    }else if (document.getElementById("namePlayerInput").value.length > 3){
        document.getElementById("startGameBtn").style.visibility = "visible"
    }else{
        document.getElementById("startGameBtn").style.visibility = "hidden"
    }

},100)


