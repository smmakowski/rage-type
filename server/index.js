var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var scores = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
// app.use(bodyParser.json());

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/scores', function (req, res) {
  scores.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {

      res.json(data);
    }
  });
});

app.post('/scores', function(req, res) {
	scores.addOne({name: req.body.name, score: req.body.score}, function(err, data) {
		if(err) {
			res.sendStatus();
		} else {
			console.log('MADE IT PAST SERVER LEVEL!')
		}
	});
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

