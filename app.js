var express = require('express');
var app = express();

var exphbs  = require('express-handlebars');

var giphy = require('giphy-api')();

app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/hello-world', function (req, res) {
  res.send('Hello World');
});

app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
  console.log('Testing');
})

app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
})

var http = require('http');

app.get('/', function (req, res) {
  var queryString = req.query.term;
  var term = encodeURIComponent(queryString);
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';

  http.get(url, function(response) {
    response.setEncoding('utf8');

    var body = '';

    response.on('data', function(d) {
      // Continuously update stream with data
      body += d;
    });

    response.on('end', function() {
      // Data reception is done, do whatever with it!
      var parsed = JSON.parse(body);
      res.render('home', {gifs: parsed.data})
    });
  });
})
app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});
