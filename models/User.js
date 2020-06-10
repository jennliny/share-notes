'use strict';
const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = Schema({
  name: String
  email: String
});

module.exports = mongoose.model('User', userSchema);
