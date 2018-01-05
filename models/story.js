var mongoose = require('mongoose')
var Schema = mongoose.Schema

var storySchema = new Schema({
	title: String,
	subtitle: String,
	author: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
	body: String,
  uri: String,
  topics: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  }],
  bookmarks: Number,
  claps: Number,
  comments: [{
    text: String,
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    }
  }],
  reads: Number,
  date: {
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  }
})

postSchema.pre('save', function(next) {
  this.date.updated = new Date()
  if (!this.date.created)
    this.date.created = this.date.updated
  next()
})

module.exports = storySchema
