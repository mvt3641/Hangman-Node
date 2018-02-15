var letter = require('./letter');



/// Word Constructer //
function Word(wrd) {
  var that = this;
  //store string as wrd
  this.word = wrd;
  this.letters = [];
  this.wordFound = false;
  //Function that runs word through letter constructer to generate letters
  this.popLet = function() {
    //populate the collection with letter objects//
    for (var i = 0; i < that.word.length; i++) {
      var newLetter = new letter(that.word[i]);
      this.letters.push(newLetter);

    }
  };


  //FOUND CURRENT WORD
  this.foundWord = function() {
    if (this.letters.every(function(ltr) {
        return ltr.show === true;
      })) {
      this.wordFound = true;
      return true;
    }

  };


  this.foundLetter = function(guessedLetter) {
    var whatToReturn = 0;

    //goess through each letter to see if matchs guessed letter
    this.letters.forEach(function(ltr) {
      if (ltr.letter === guessedLetter) {
        ltr.show = true;
        whatToReturn++;
      }
    })
    //If guessed letter matcheds letter property  show letter object
    return whatToReturn;
  };

  this.wordRender = function() {
    var display = '';
    //show word based on if correct letters guessed
    that.letters.forEach(function(ltr) {
      var currentLetter = ltr.letterRender();
      display += currentLetter;
    });
    return display;
  };
}

module.exports = Word;
