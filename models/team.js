var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }]
});

module.exports = mongoose.model('Team', TeamSchema);
