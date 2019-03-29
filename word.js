
var Letter = require("./letter.js");

const Word = function (word) {
    // initialize a word object
    this.word = word;
    // create letters array from word and for each letter, initialize each as a letter object 
    this.letters = this.word.split("")
        .map(function (letter) { return new Letter(letter); });
    // check to see if a letter was a match and replace with correct guess if it was or an _ if not
    this.getWord = function () {
        let word = "";
        for (letter in this.letters) {
            word += this.letters[letter].verifyReplace();
        }
        return(word.split("").join(" "));
    }
    // check to see if the current word is done being guessed
    this.wordDone = function (wordProg) {
        console.log(this.word === wordProg);
    }
}

// test this constructor:
// let testWord = new Word('sun');
// console.log(testWord);

module.exports = Word;