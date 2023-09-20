const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  Username: {type: String,required: true},
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Profession :{ type: String, required: true },
  PhoneNumber: { type: String, required: true, unique: true },
});
const Admins = mongoose.model('Admins', AdminSchema);
module.exports = Admins;