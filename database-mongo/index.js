var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/scores');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var scoreSchema = mongoose.Schema({
  name: String,
  score: Number
});

var Score = mongoose.model('Score', scoreSchema);

//add new person
var addOne = function(data, callback) {
  var comparison = Score.findOne(data);
  console.log(comparison);
  var newScore = new Score(data);
  newScore.save(function(err, newScore) {
    if (err) {
      console.log('NOT SAVED IN DB');
    }

    console.log('SAVED IN DB!');
  });
}

//get all people
var selectAll = function(callback) {
  Score.find({}, null, {sort: {score: -1}}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};


module.exports.selectAll = selectAll;
module.exports.addOne = addOne;