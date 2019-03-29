
let inquirer = require("inquirer");
let Word = require("./word.js");


let possibleWords = ['rainbow', 'clouds', 'sun', 'moon', 'wind'];
let wordGuessIndex;
let wordToGuess;
let missedCount;
let currentWord;
let wins =0;

initGame();
promptUser();


//sanitize input
//object to validate input before proceeding.
var validation = {
  isNotEmpty: function (str) {
    var pattern = /\S+/; // match one or more spaces
    return pattern.test(str);  // returns a boolean
  },
  isOneLetter: function (str) {
    var pattern = /^[a-zA-Z]$/; // matches <one> char only
    return pattern.test(str);
  },
  isMoreThanOneChar: function(str) {
    var pattern = /[a-zA-Z0-9_]{2,}/;
    return pattern.test(str);
  },
  hasNonLetters: function(str){
    var pattern = /[^a-zA-Z]/;
    return pattern.test(str);
  }
};

function initGame() {
  wordGuessIndex = Math.floor(Math.random() * possibleWords.length);
  wordToGuess = possibleWords[wordGuessIndex];
  currentWord = new Word(wordToGuess);
  missedCount = 10; // number of guesses alloud in any word 

}

function promptUser() {

  console.log('\n');
  console.log("Try guessing this word: ");
  console.log(currentWord.getWord());
  console.log('\n');
  console.log(`${missedCount} missed guesses remaining`);
  console.log(`Total wins: ${wins}`);
  console.log('\n');

  inquirer.prompt([
    {
      message: "Enter letter guess: ",
      type: "input",
      name: "inputLetter"
    }
  ]).then(function (response) {

    let inputLetter = (response.inputLetter).toLowerCase();

    if (validation.isOneLetter(inputLetter) && validation.isNotEmpty(inputLetter)) {
      let currWordLetters = currentWord.letters;
      let matchFound = false;
      //for each letter in the current word
      for (letter in currWordLetters) {
        // compare it to the user input to find a match
        if (currWordLetters[letter].checkChar(inputLetter)) {
          // if a match is found, checkChar() changes the wasGuessed value to true
          matchFound = true; // indicates at least one match was found during word traversal
        }
      }
      // if there were no letters match found after traversing the word
      if (matchFound === false) {
        missedCount--;
      }

      // determine if the word has been completely guessed
      let currWrdProgress = (currentWord.getWord()).split(" ").join('');

      // continue prompting for letters if guesses are allowed and word is still incomplete
      if (missedCount > 0 && !(currWrdProgress === currentWord.word)) {
        promptUser();
      }

      // if the word has been completed successfully, congratulate and prompt for another game
      if (missedCount > 0 && (currWrdProgress === currentWord.word)) {
        console.log("-------------------------------");
        console.log("Congratulations!");
        console.log(`The word guessed was ${currentWord.word}`);
        wins++;
        console.log(`Total wins: ${wins}`);
        console.log("-------------------------------");
        initGame();
        promptUser();
      }

      // if the user ran out of allowed guesses, game over and reset the game
      if (missedCount <= 0) {
        console.log("-------------------------------");
        console.log("Ran out of alloud guesses!");
        console.log(`The answer was ${currentWord.word}.`)
        console.log(`Total wins: ${wins}`);
        console.log("-------------------------------");
        wins=0;

        inquirer.prompt([
          {
            message: "Continue Playing?",
            type: "list",
            choices: ['Yes, this game is awesome!', 'No, I rather do homework'],
            name: "continue"
          }
        ]).then(function (res) {
          if (res.continue === 'Yes, this game is awesome!') {
            initGame(); //chooses another word and resets allowed guesses for that word
            promptUser();
          }
          else {
            console.log("\n");
            console.log("-------------------------------");
            console.log("See ya!")
            console.log("-------------------------------");
            console.log("\n");
          }
        });
      }
    } // end input validation
    else {

      if (validation.isMoreThanOneChar(response.inputLetter)){
        console.log("----------------------------------------------");
        console.log("|  Please enter only ONE character at a time. |")
        console.log("----------------------------------------------");
      }

      if (validation.hasNonLetters(response.inputLetter)){
        console.log("-------------------------------");
        console.log("|  Please enter letters only. |")
        console.log("-------------------------------");
      }
      promptUser();
    }
  }); // end enquirer
} // end promptUser()



