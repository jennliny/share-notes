'use strict';
const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = Schema({
  googleid:String,
  googletoken: String,
  googleemail:String,
  userName:String,
});

module.exports = mongoose.model('User', userSchema);
