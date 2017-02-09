// https://www.opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple
const request = require('request');
const entities = require('html-entities').AllHtmlEntities;

var getQuestion = function(callback) {
  request.get('https://www.opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple', (err, response, body) => {
    const data = JSON.parse(body);
    var q = entities.decode(data.results[0].question);
    callback(data.results, q, data.results[0]);
  });
}

module.exports = getQuestion
