// https://www.opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple
const request = require('request');
const entities = require('html-entities').AllHtmlEntities;

var getQuestion = function(callback, n) {
  if(n === undefined){
    n = 1;
  }
  if (n === 1) {
    n = n + 1;
  }
  request.get('https://www.opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple', (err, response, body) => {
    const data = JSON.parse(body);
    var q = entities.decode(data.results[n].question);
    console.log('I am the value number: ' + n);
    callback(data.results, q, data.results[n], n);
  });
}

module.exports = getQuestion
