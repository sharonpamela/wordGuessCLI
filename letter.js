var Letter = function(letter){
    this.letter = letter;
    this.wasGuessed = false;
    this.verifyReplace = function(){
        if (this.wasGuessed === true) {
            return this.letter
        } else {
            return '_'
        }
    };
    this.checkChar = function(char){
        let matchFound = false;
        if (char === this.letter){
            this.wasGuessed = true;
            matchFound = true;
        } 
        return matchFound;
    }
}

// Test this constructor:
// let testLetter = new Letter('p');
// console.log(testLetter);
// console.log(testLetter.wasGuessed);
// console.log(testLetter.verifyReplace());
// console.log(testLetter.checkChar('p'));

module.exports = Letter;

