var mongoose = require('mongoose');

var open = function(callback) {
  var connection = mongoose.createConnection('mongodb://heroku_app25604257:fuj6pcfg45ebk97mcj3r7ac5bm@ds053168.mongolab.com:53168/heroku_app25604257');

  connection.on('open', function() {
    callback(null, connection);
  });
};

var close = function(connection, callback) {
  connection.close();
  callback(); // synchronous
};

module.exports = {
  open: open,
  close: close
};
