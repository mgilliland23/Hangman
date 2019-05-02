var gameWords = ["frodo", "samwise", "gandalf", "bilbo", "gimli"];

//
var randomWord = function(wordsArray){
    //Generate a random number between 0 - 4
    var randIndex = Math.floor(Math.random()*wordsArray.length);
    //
    return wordsArray[randIndex];

    
}

var isCorrectGuess = function(word, letter){
    if( word.includes(letter)){
        return true;
    }
    else{
        return false;
    }
}

var getBlanks = function(word){
    var blanksArray = [];
    for(var i= 0; i < word.length; i++){
        blanksArray.push("_");
    }
    return blanksArray;
}

var fillBlanks = function(word, puzzleState, letter){
   
    for( var i = 0; i < word.length; i++){
        if(word.charAt(i) == letter){
            puzzleState[i] = letter;
        }
    }
    return puzzleState;

}

