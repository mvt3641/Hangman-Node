//NPM packages//
var inquirer = require('inquirer');
//Required Exports//
var Word = require('./word');
var game = require('./game');


var hangman = {
  wordbank: game.wordList,
  guessesLeft: 10,
  guessedLtr: [],
  display: 0,
  currentWord: null,
  ///Start Game//
  startGame: function() {
    var that = this;
    // removes guessedLetters before a new game starts
    if (this.guessedLtr.length > 0) {
      this.guessedLtr = [];
    }

    inquirer.prompt([{
        name: "start",
        type: "confirm",
        message: "Are you ready to play!?"
      }])
      .then(function(answer) {
        if (answer.start) {
          that.newGame();
        } else {
          console.log('maybe later...');
        }

      })
  },


  //////If new game is selected
  newGame: function() {
    if (this.guessesLeft === 10) {
      console.log("Lets Get It!");
      //generates random number for wordlist index
      var randNum = Math.floor(Math.random() * this.wordbank.length);
      //generates new random word from index via contstruct
      this.currentWord = new Word(this.wordbank[randNum]);
      //Populates random word by letters
      this.currentWord.popLet();
      //displays word as blanks
      console.log(this.currentWord.wordRender());
      this.promptUser();
    } else {
      this.resetRemainingGues();
      this.newGame();
    }
  },
  resetRemainingGues: function() {
    this.guessesLeft = 10;
  },
  promptUser: function() {
    var that = this;
    //asks player for a letter
    inquirer.prompt([{
      name: 'chosenLtr',
      type: 'input',
      message: 'Choose a letter'


    }]).then(function(ltr) {
      var letterReturned = (ltr.chosenLtr).toUpperCase();
      // adds to the guessedLtr Array if not there already
      var guessedAlready = false;
      //loop through guessedLtr to check
      for (var i = 0; i < that.guessedLtr; i++) {
        if (letterReturned === that.guessedLtr[i]) {
          guessedAlready = true;
        }
      };
      // if the letter was not guessed guessedAlready
      if (guessedAlready === false) {
        that.guessedLtr.push(letterReturned);


        var found = that.currentWord.foundLetter(letterReturned);
        if (found === 0) {
          console.log('Wrong');
          that.guessesLeft--;
          console.log('Guesses Remaining: ' + that.guessesLeft);
          console.log('\n*******************');
          console.log(that.currentWord.wordRender());
          console.log('\n*******************');
          console.log("Letters guessed: " + that.guessedLtr);
        } else {
          console.log('Yes! Good Call!');
          // if(that.currentWord.foundWord()=== true){
          //   console.log(that.currentWord.wordRender());
          //   console.log('Awesome you won!');
          //   }

          // else {
          console.log('Guesses remaining: ' + that.guessesLeft);
          console.log(that.currentWord.wordRender());
          console.log('\n*******************');
          console.log("Letters guessed: " + that.guessedLtr);
          if (that.currentWord.foundWord() === true) {
            console.log(that.currentWord.wordRender());
            console.log('Awesome you won!');
          }

        }
      }
      if (that.guessesLeft > 0 && that.currentWord.wordFound === false) {
        that.promptUser();
      } else if (that.guessesLeft === 0) {
        console.log('Game Over!');
        console.log('The word you were guessing was: ' + that.currentWord.word);
      }
    })
  }
};
hangman.startGame();
