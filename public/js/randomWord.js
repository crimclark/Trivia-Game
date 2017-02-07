var randWord = function(){
  var randomLetter;
  var randomWord = [];
  for (var i = 0; i < 8; i++){
    var randomNumber = Math.floor(Math.random() * 26);
    switch (randomNumber){
      case 0:
      randomLetter = 'a';
      break;
      case 1:
      randomLetter = 'b';
      break;
      case 2:
      randomLetter = 'c';
      break;
      case 3:
      randomLetter = 'd';
      break;
      case 4:
      randomLetter = 'e';
      break;
      case 5:
      randomLetter = 'f';
      break;
      case 6:
      randomLetter = 'g';
      break;
      case 7:
      randomLetter = 'h';
      break;
      case 8:
      randomLetter = 'i';
      break;
      case 9:
      randomLetter = 'j';
      break;
      case 10:
      randomLetter = 'k';
      break;
      case 11:
      randomLetter = 'l';
      break;
      case 12:
      randomLetter = 'm';
      break;
      case 13:
      randomLetter = 'n';
      break;
      case 14:
      randomLetter = 'o';
      break;
      case 15:
      randomLetter = 'p';
      break;
      case 16:
      randomLetter = 'q';
      break;
      case 17:
      randomLetter = 'r';
      break;
      case 18:
      randomLetter = 's';
      break;
      case 19:
      randomLetter = 't';
      break;
      case 20:
      randomLetter = 'u';
      break;
      case 21:
      randomLetter = 'v';
      break;
      case 22:
      randomLetter = 'w';
      break;
      case 23:
      randomLetter = 'x';
      break;
      case 24:
      randomLetter = 'y';
      break;
      case 25:
      randomLetter = 'z';
      break;
      default:
      randomLetter = undefined;
    }
    randomWord.push(randomLetter);
    randomWord = randomWord.join('');
  }
  return randomWord;
}

console.log(randWord());
