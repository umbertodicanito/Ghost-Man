var clickForwardSound = new Audio('../audio/clickForward.wav');
var clickPickedSound = new Audio('../audio/pickCoin.wav');
var clickWrongPickedSound = new Audio('../audio/pickWrongCoin.wav');
var backgroundMusic = new Audio('../audio/background_track.mp3');


//this is used to set the sound of the click of buttons/images to go forward
function playClickForward() {
    clickForwardSound.play();
    clickForwardSound.volume=0.50;
}

//this is used to set the sound of the coin when it's taken
function playCoinPicked() {
    clickPickedSound.play();
    clickPickedSound.volume=1;
}

//this is used to set the sound of the wrong coin when it's taken
function playWrongCoinPicked() {
    clickWrongPickedSound.play();
    clickWrongPickedSound.volume=0.7;
}

//this is used to set the sound of the initial game countdown
function playBackground() {
    backgroundMusic.play();
    backgroundMusic.volume=0.7;
    backgroundMusic.loop=true;
}

