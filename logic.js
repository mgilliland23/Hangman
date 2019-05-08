var gameWords = ["frodo", "samwise", "gandalf", "bilbo", "gimli"];

var puzzleSection = document.getElementById("puzzle-state");
var wrongGuesses = document.getElementById("wrong-guesses");
var numGuesses = document.getElementById("guesses-left");
var winCounter = document.getElementById("win-counter");
var lossCounter = document.getElementById("loss-counter");
var modalText = document.getElementById("modal-text");
var modalTitle = document.getElementById("modal-title");

var myGame = setupGame(gameWords, 0, 0);
puzzleSection.innerHTML = printArray(myGame.round.puzzleState);

function randomWord(wordsArray){
    var randIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randIndex];
}

function isCorrectGuess(word, letter) {
    if (word.includes(letter)) {
        return true;
    }
    else {
        return false;
    }
}

function getBlanks(word) {
    var blanksArray = [];
    for (var i = 0; i < word.length; i++) {
        blanksArray.push("_");
    }
    return blanksArray;
}

function fillBlanks(word, puzzleState, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) === letter) {
            puzzleState[i] = letter;
        }
    }
    return puzzleState;
}

function setupRound(word) {
    var newRound = {
        word: word,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: getBlanks(word)
    }
    return newRound;
}

function updateRound(thisRound, letterGuessed) {
    if (isCorrectGuess(thisRound.word, letterGuessed)) {
        thisRound.puzzleState = fillBlanks(thisRound.word, thisRound.puzzleState, letterGuessed);
    }
    else {
        console.log("wrong guess");
        thisRound.wrongGuesses.push(letterGuessed);
        thisRound.guessesLeft--;
    }
}

function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
        if (puzzleState[i] === "_") {
            return false;
        }
    }
    return true;
}

function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    else {
        return false;
    }
}

function isEndOfRound(thisRound) {
    if (hasLost(thisRound.guessesLeft)) {
        return true;
    }
    else if (hasWon(thisRound.puzzleState)) {
        return true;
    }
    else {
        return false;
    }
}

function setupGame(randomWords, numWins, numLosses) {
    var game = {
        words: randomWords,
        wins: numWins,
        losses: numLosses,
        round: setupRound(randomWord(randomWords))
    }
    return game;
}

function startNewRound(game) {
    
    if (hasLost(game.round.guessesLeft)) {
        game.losses++;
        modalTitle.innerHTML = "Loser!";
        modalText.innerHTML = "You have lost! The characters name was: " + game.round.word;
        $("#alert-modal").modal("show");

    }
    else if (hasWon(game.round.puzzleState)) {
        game.wins++;
        modalTitle.innerHTML = "Winner!";
        modalText.innerHTML = "You have won! The characters name was: " + game.round.word;
        $("#alert-modal").modal("show");
    }

    game.round = setupRound(randomWord(game.words));
    
}

function printArray(array){
    var arrayAsString = "";
    for( var i = 0; i < array.length; i++){
        if( i === (array.length - 1)){
            arrayAsString += array[i];
        }
        else{
            arrayAsString += array[i] + " ";
        }
        
    }
    return arrayAsString;
}

document.addEventListener( 'keydown', function(e){
    console.log("letter played: " + e.key);

    var letterPlayed = e.key;

    updateRound(myGame.round, letterPlayed);
    
    if(isCorrectGuess(myGame.round.word, letterPlayed)){
        puzzleSection.innerHTML = printArray(myGame.round.puzzleState);

    }
    else{
        wrongGuesses.innerHTML = printArray(myGame.round.wrongGuesses);
        numGuesses.innerHTML = myGame.round.guessesLeft;
    }

    if(isEndOfRound(myGame.round)){
        startNewRound(myGame);

        console.log(myGame.round);

        //Update DOM
        puzzleSection.innerHTML = printArray(myGame.round.puzzleState);
        wrongGuesses.innerHTML = myGame.round.wrongGuesses;
        numGuesses.innerHTML = myGame.round.guessesLeft;
        winCounter.innerHTML = myGame.wins;
        lossCounter.innerHTML = myGame.losses;
 
    }   

});



