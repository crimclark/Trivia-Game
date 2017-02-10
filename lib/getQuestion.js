// https://www.opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple
// https://www.opentdb.com/api.php?amount=1&category=11&type=multiple
const request = require('request');
const entities = require('html-entities').AllHtmlEntities;

var getQuestion = function(category, callback) {
  console.log(category)
  request.get(`https://www.opentdb.com/api.php?amount=1&category=${category}&difficulty=medium&type=multiple`, (err, response, body) => {
<<<<<<< HEAD
    const data = JSON.parse(body).results[0];
    var q = entities.decode(data.question);
    callback(data, q);
  });
=======
    const data = JSON.parse(body).results[0]
    console.log(data)
    var q = entities.decode(data.question)
    callback(data, q)
  })
>>>>>>> e3239bd60790ec77f76f8ea54ff828f902569866
}

module.exports = getQuestion
