'use strict';
const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var noteSchema = Schema({
  courseId: {type:ObjectId, index:true},
  title: String,
  author: {type:ObjectId, index:true},
  createdAt: Date
});

module.exports = mongoose.model('Note', noteSchema);
