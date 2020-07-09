const NORMAL = 0;
const HARD = 1;
const CRAZY = 2;

const RED = 0;
const YELLOW = 1;
const PINK = 2;
const BLUE = 3;

var coinIterPointer = 0;
var playerName = ""
var currentDifficulty = NORMAL
var currentCharacter = RED

var scoresNormal = []
var scoresHard = []
var scoresCrazy = []
var currentScore = 0

var sequenceColorsCoin = []
var sequencePositionsCoin = []

var scoreLists = [scoresNormal, scoresHard, scoresCrazy]

var numberOfAttempts = 0

//getting current settings
currentScore = sessionStorage.getItem("currentScore")
if(currentScore == null){
    currentScore = 0
}

scoreLists = sessionStorage.getItem("scoreLists")
if(scoreLists == null){
    scoreLists = [scoresNormal, scoresHard, scoresCrazy]
}else{
    //stringe in matrice
    scoreLists = JSON.parse(scoreLists)
    scoresNormal = scoreLists[0]
    scoresHard = scoreLists[1]
    scoresCrazy = scoreLists[2]
}

sequenceColorsCoin = sessionStorage.getItem("sequenceColorsCoin")
if(sequenceColorsCoin == null)
    sequenceColorsCoin = []
else{
    sequenceColorsCoin = sequenceColorsCoin.split(",")
    for(var i = 0; i< sequenceColorsCoin.length; i++)
        sequenceColorsCoin[i] = parseInt(sequenceColorsCoin[i])
}

sequencePositionsCoin = sessionStorage.getItem("sequencePositionsCoin")
if(sequencePositionsCoin == null)
    sequencePositionsCoin = []
else{
    sequencePositionsCoin = sequencePositionsCoin.split(",")
    for(var i = 0; i< sequencePositionsCoin.length; i++)
        sequencePositionsCoin[i] = parseInt(sequencePositionsCoin[i])
}

currentDifficulty = sessionStorage.getItem("currentDifficulty")
if(currentDifficulty == null)
    currentDifficulty = NORMAL
else
    currentDifficulty = parseInt(currentDifficulty)

playerName = sessionStorage.getItem("playerName")
if(playerName==null)
    playerName = ""

currentCharacter = sessionStorage.getItem("currentCharacter")
if(currentCharacter==null)
    currentCharacter = RED
else
    currentCharacter = parseInt(currentCharacter)

numberOfAttempts = sessionStorage.getItem("numberOfAttempts")
if(numberOfAttempts==null)
    numberOfAttempts = 0
else
    numberOfAttempts = parseInt(numberOfAttempts)

//functions 
function startGame(level){
    currentDifficulty = level
    sessionStorage.setItem("currentDifficulty", level.toString())
}

function characterChoosen(character){
    currentCharacter = character
    sessionStorage.setItem("currentCharacter", character.toString())
}

function setPlayerName(name){
    playerName = name;
    sessionStorage.setItem("playerName", name)
}

function increaseScore(s){
    currentScore += 50 * (s*1000)/3
    stringScore = Math.floor(currentScore).toString()
    while(stringScore.length<7)
        stringScore = "0" + stringScore
    document.getElementById("currentScore").innerHTML = stringScore
}

function initColorAndPosition(){
    var c, p;
    for(var i = 0; i < 100; i++){
        c = getRndInteger(0,4)
        p = getRndInteger(0,4)
        sequenceColorsCoin.push(c)
        sequencePositionsCoin.push(p)
    }
    //checking for repetition
    check(sequenceColorsCoin)
    check(sequencePositionsCoin)
    
    sessionStorage.setItem("sequenceColorsCoin", sequenceColorsCoin)
    sessionStorage.setItem("sequencePositionsCoin",sequencePositionsCoin)
}

function gameFinished(){
    var s = newScore(playerName, currentCharacter, currentScore)
    scoreLists[currentDifficulty].push(s)
    sessionStorage.setItem("scoreLists", JSON.stringify(scoreLists))
    
    numberOfAttempts++
    sessionStorage.setItem("numberOfAttempts", numberOfAttempts.toString())
    var temp;
    switch(numberOfAttempts){
        case 1:
            for(var i = 0; i<sequenceColorsCoin.length; i++){
                temp = sequenceColorsCoin[i]
                var ni = sequenceColorsCoin[i] + sequencePositionsCoin[i]
                while(ni>3)
                    ni = ni - 4
                sequenceColorsCoin[i] = ni
                sequencePositionsCoin[i] = temp
            }
            break;
        case 2:
            for(var i = 0; i<sequenceColorsCoin.length; i++){
                temp = sequenceColorsCoin[i]
                var ni = sequenceColorsCoin[i] * sequencePositionsCoin[i]
                while(ni>3)
                    ni = ni - 4
                sequenceColorsCoin[i] = ni
                sequencePositionsCoin[i] = temp
            }
            break;
        case 3:
            for(var i = 0; i<sequenceColorsCoin.length; i++){
                temp = sequenceColorsCoin[i]
                sequenceColorsCoin[i] = sequencePositionsCoin[i]
                sequencePositionsCoin[i] = temp
            }
        case 4:
            for(var i = 0; i<sequenceColorsCoin.length; i++){
                temp = sequenceColorsCoin[i]
                var ni = sequenceColorsCoin[i] - sequencePositionsCoin[i]
                while(ni>3)
                    ni = ni - 4
                while(ni<0)
                    ni = ni + 4
                sequenceColorsCoin[i] = ni
                sequencePositionsCoin[i] = temp
            }
            break;
        case 5:
            initColorAndPosition()
            numberOfAttempts = 0
            break;
    }    
    sessionStorage.setItem("sequenceColorsCoin", sequenceColorsCoin)
    sessionStorage.setItem("sequencePositionsCoin", sequencePositionsCoin)
}

function check(sequence){
    count = 0
    if(sequence!=null || sequence.length>0)
    {
        var prev = sequence[0]
        var toModify = []
        for (var j = 1; j<sequence.length; j++){
            if(sequence[j] == sequence[j-1])
                count++
            else
                count = 0
            
            if(count>2)
                toModify.push(j)
        }
        
        for (var z=0; z<toModify.length; z++){
            var tm = toModify[z]
            var current = sequence[tm]
            var newInt = getRndInteger(0,4)
            while(newInt == current)
                newInt = getRndInteger(0,4)
            sequence[tm] = newInt
        }
    }
    else
        console.log("Attention: sequence of color or position empty or not defined")
}

function getNextColor(){
    //[time,color]
    var c = getRndInteger(0,4)
    while(c == currentCharacter)
        c = getRndInteger(0,4)
    return [getRndInteger(6,21), c]
}

function getRndInteger(min, max) {
    //min is included, max not
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getGhostColorCode(){
    return getColorCode(currentCharacter)
}

function getColorCode(pointerColor){
    var colorCode
    switch(pointerColor){
        case RED:
            colorCode = 0xff0000
            break
        case BLUE:
            colorCode = 0x00ffff
            break
        case YELLOW:
            colorCode = 0xf9ff00
            break
        default:
            colorCode = 0xFF00B9
            break
    }
    return colorCode;
}

//init with fake points score
function newScore(namePlayer, nameCharact, points){
    
    var character = ""
    switch(nameCharact) {
        case RED:
            character = "RED";
            break;
            
        case YELLOW:
            character = "YELLOW";
            break;
        
        case PINK:
            character = "PINK";
            break;
            
        case BLUE:
            character = "BLUE";
            break;
    }
    
    var score = {
        player: namePlayer,
        character: character,
        points: Math.floor(points)
    }
    
    return score;
}

if(scoreLists[0].length == 0){
   var fakeName = ["Tony","Maccheroni","Pizza","StarLord"]
    for(var i = 0; i<10; i++){
        var p = 1000 * (10-i)
        j = i
        while(j>3){
            j = j-4
        }
        var s = newScore(fakeName[j], RED, p)

        scoresNormal.push(s)
        scoresHard.push(s)
        scoresCrazy.push(s)
    } 
}


function getNextCoin(){
    var res = [getColorCode(sequenceColorsCoin[coinIterPointer]), sequencePositionsCoin[coinIterPointer]]
    coinIterPointer++
    if(coinIterPointer>100)
        coinIterPointer = 0;
    return res;
}