var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

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

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var fluffy = new Kitten({ name: 'fluffy' });

module.exports.selectAll = selectAll;