
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

//var userSchema = mongoose.Schema( {any:{}})

var userSchema = Schema( {
  googleid: String,
  googletoken: String,
  googlename:String,
  googleemail:String,
  username:String,
  imageURL: String,
  imageFileName: String,
  favorite:[{type:Schema.Types.ObjectId, ref:"Note"}]
} );

module.exports = mongoose.model( 'User', userSchema );
