var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmployeeSchema = new Schema({
  id: String,
  name: {
    first: String,
    last: String
  },
  team: String,
  image: String
});
var getModel = function(connection) {
  return connection.model('Employee', EmployeeSchema);
};

module.exports = {
  getModel: getModel
};
