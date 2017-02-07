var randWord = function(){
  var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  var randomWord = [];
  var i = 0;
  while(i < 8){
    var randomNumber = Math.floor(Math.random() * 62);
    var randomLetter = alphabet.charAt(randomNumber);
    randomWord.push(randomLetter);
    i++;
  }
  randomWord = randomWord.join('');
  // console.log('I am short word: ' + randomWord);
  return randomWord;
}

// console.log(randWord());


