var mongoose = require('mongoose');
var dbUrl = 'mongodb://heroku_app25604257:fuj6pcfg45ebk97mcj3r7ac5bm@ds053168.mongolab.com:53168/heroku_app25604257';

mongoose.connect(dbUrl);

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

require('../models/employee');
require('../models/team');