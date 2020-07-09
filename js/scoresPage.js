var currentDifficultyScore = NORMAL;

setTimeout(function(){
    document.getElementById("scoreContainer").style.backgroundColor = "rgba(0.0,0.0,255.0,0.75)"
    document.getElementById("difficultyContainer").style.backgroundColor = "rgba(0.0,0.0,255.0,0.75)"
    document.getElementById("scores0").classList.add("selected")    
    
    document.getElementById("scores0").onclick = function(){
        if(currentDifficultyScore != NORMAL){
            var idBtn = "scores" + currentDifficultyScore.toString()
            document.getElementById(idBtn).classList.remove("selected")
            document.getElementById("scores0").classList.add("selected")
            currentDifficultyScore = NORMAL
            changeScore()
        }
        playClickForward();
    }
    document.getElementById("scores1").onclick = function(){
        if(currentDifficultyScore != HARD){
            var idBtn = "scores" + currentDifficultyScore.toString()
            document.getElementById(idBtn).classList.remove("selected")
            document.getElementById("scores1").classList.add("selected")
            currentDifficultyScore = HARD
            changeScore()
        }
        playClickForward();
    }
    document.getElementById("scores2").onclick = function(){
        if(currentDifficultyScore != CRAZY){
            var idBtn = "scores" + currentDifficultyScore.toString()
            document.getElementById(idBtn).classList.remove("selected")
            document.getElementById("scores2").classList.add("selected")
            currentDifficultyScore = CRAZY
            changeScore()
        }
        playClickForward();
    }
    
    changeScore()
    
},100)

function changeScore(){
    var elementName = document.getElementById("scoreContainerName")
    var elementChar = document.getElementById("scoreContainerCharacter")
    var elementPoint = document.getElementById("scoreContainerPoints")
    
    var scoresName = ""
    var scoresChar = ""
    var scoresPoint = ""
    
    var currentList = scoreLists[currentDifficultyScore]
    
    //ordering
    currentList = sort(currentList)
    
    /*little adjustment for name too long*/
    for(var i = 0; i<currentList.length; i++){
        var s = currentList[i]
        var n = s.player
        if(n.length>=10){
            n = n.substr(0,11)
        }
        
        scoresName = scoresName + n + "<br/>"
        scoresChar = scoresChar + s.character + "<br/>"
        scoresPoint = scoresPoint + s.points + "<br/>"
    }
    elementName.innerHTML = scoresName
    elementChar.innerHTML = scoresChar
    elementPoint.innerHTML = scoresPoint 
}

function sort(arr){
    var A = []
    var j
    if(arr!=null && arr.length>=0){
        for(var i = 0; i<arr.length; i++){
            j = A.length
            if(j==0)
                A.push(arr[i])
            else{
                while(j>0 && A[j-1].points < arr[i].points)
                    j--
                if(j!=A.length)
                    A.splice(j,0,arr[i])
                else
                    A.push(arr[i])
            }
        }
    }
    return A
}