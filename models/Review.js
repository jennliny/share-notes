'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = Schema( {
  term: String,
  subject: String,
  title: String,
  courseID: String,
  section:String,
  author: String,
});

module.exports = mongoose.model('Review',reviewSchema);
