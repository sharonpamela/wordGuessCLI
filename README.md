# wordGuessCLI

This is a javascript based game on the CLI. The goal is for the user to guess all of the letters found in the word presented one at a time. 


RULES OF THE GAME
When the game first begins it displays a number of dashes corresponding to the number of letters in the first word to be guessed.
The maximum amount of missed guesses allowed per word is 10. 

If the user guesses all of the letters in the word within the allowed amount of guesses, the user wins that word and is automaticaly served another word to guess.

If the user runs out of allowed guesses for a word, the game ends and prompts the user to continue playing or quit.

MORE ABOUT THE GAME:

This game was made to demonstrate an example use of constructors in javascript. 

index.js handles the logic of the game
letter.js handles the letter constructor
word.js handles the word constructor

The game utilizes "inquire" to collect all user input and validates it using REGEX. 
