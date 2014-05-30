var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeamSchema = new Schema({
  name: String,
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
