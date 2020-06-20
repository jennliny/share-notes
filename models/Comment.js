'use strict';
const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const commentSchema = Schema( {
  user:String,
  note: {type:Schema.Types.ObjectId, ref:"Note"},
  createdAt: Date,
  comment:String,
  rate:Number
});

module.exports = mongoose.model('Comment', commentSchema);
