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
var getModel = function(connection) {
  return connection.model('Team', TeamSchema);
};

module.exports = {
  getModel: getModel
};
