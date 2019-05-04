var gameWords = ["frodo", "samwise", "gandalf", "bilbo", "gimli"];

//
var randomWord = function (wordsArray) {
    //Generate a random number between 0 - 4
    var randIndex = Math.floor(Math.random() * wordsArray.length);
    //
    return wordsArray[randIndex];


}

var isCorrectGuess = function (word, letter) {
    if (word.includes(letter)) {
        return true;
    }
    else {
        return false;
    }
}

var getBlanks = function (word) {
    var blanksArray = [];
    for (var i = 0; i < word.length; i++) {
        blanksArray.push("_");
    }
    return blanksArray;
}

var fillBlanks = function (word, puzzleState, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) === letter) {
            puzzleState[i] = letter;
        }
    }
    return puzzleState;
}

var setupRound = function (word) {
    var newRound = {
        word: word,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: getBlanks(word)
    }
    return newRound;
}

var updateRound = function (thisRound, letterGuessed) {
    if (isCorrectGuess(thisRound.word, letterGuessed)) {
        thisRound.puzzleState = fillBlanks(thisRound.word, thisRound.puzzleState, letterGuessed);
    }
    else {
        thisRound.wrongGuesses.push(letterGuessed);
        thisRound.guessesLeft--;
    }
}

var hasWon = function (puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
        if (puzzleState[i] === "_") {
            return false;
        }
    }
    return true;
}

var hasLost = function (guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    else {
        return false;
    }
}

var isEndOfRound = function (thisRound) {
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

var setupGame = function (randomWords, numWins, numLosses) {
    var game = {
        words: randomWords,
        wins: numWins,
        losses: numLosses,
        round: setupRound(randomWord(randomWords))
    }

    return game;
}

var startNewRound = function (game) {
    if (hasLost(game.round.guessesLeft)) {
        game.losses++;
        alert("You have lost. The word was : " + game.round.word);
    }
    else if (hasWon(game.round.puzzleState)) {
        game.wins++;
        alert("You have won! The word was: " + game.round.word);
    }
    game.round = setupRound(randomWord(game.words));
}

var myGame = {
    words: [],
    wins: 0,
    losses: 0,
    round: null
}