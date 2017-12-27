var mongoose = require('mongoose')
var Schema = mongoose.Schema

var postSchema = new Schema({
	title: String,
	subtitle: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	body: String,
  date: {
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  }
})

/* the idea of the below is to prepopulate db fields for posts.
no work so far.
ref: https://alexzywiak.github.io/best-of-both-worlds-modelling-relational-data-with-mongoose/index.html

postSchema.pre('init', function(next, data) {
  Post.populate(data, {
    path: 'author'
  }, function(err, post) {
    data = post
  })
  next()
}) */

postSchema.pre('save', function(next) {
  this.date.updated = new Date()
  if (!this.date.created)
    this.date.created = this.date.updated
  next()
})

module.exports = postSchema
