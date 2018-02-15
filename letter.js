var letter = function(ltr){
  this.letter = ltr;
  this.show = false;
  this.letterRender = function(){
    if(this.letter == ' '){
      this.show = true;
      return '  ';
    }if(this.show === false){
      return ' _ ';
    }else{
      return this.letter;
    }
  };
};

module.exports =letter;
