// https://www.opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple
const request = require('request');
const entities = require('html-entities').AllHtmlEntities;

var getQuestion = function(callback) {
  request.get('https://www.opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple', (err, response, body) => {
    const data = JSON.parse(body).results[0]
    console.log(entities.decode('&quot;'));
    console.log(data);
    var q = entities.decode(data.question)
    console.log(q);
    callback(data, q)
  })
}

module.exports = getQuestion
