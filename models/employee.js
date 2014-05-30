var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmployeeSchema = new Schema({
  id: String,
  name: {
    first: String,
    last: String
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  image: {
    type: String,
    default: 'images/user.png'
  }
});

var Employee = module.exports = mongoose.model('Employee', EmployeeSchema);
