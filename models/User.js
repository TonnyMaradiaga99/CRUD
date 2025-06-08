const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  edad: String
});

module.exports = mongoose.model('User', userSchema);
