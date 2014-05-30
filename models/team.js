var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeamSchema = new Schema({
  name: String,
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }]
});

var Team = module.exports = mongoose.model('Team', TeamSchema);