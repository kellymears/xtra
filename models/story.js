var mongoose = require('mongoose')
var Schema = mongoose.Schema

var storySchema = new Schema({
  title:    String,
  subtitle: String,
  author:   {
    type: String,
    ref:  'Person'
  },
  image:  String,
  body:   String,
  topics: [{
    type: Schema.Types.ObjectId,
    ref:  'Topic'
  }],
  bookmarks: Number,
  reactions: [{
    type: Schema.Types.ObjectId,
    ref:  'Person'
  }],
  comments: [{
    text:   String,
    author: {
      type: Schema.Types.ObjectId,
      ref:  'Person'
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref:  'Person'
    }],
    dislikes: [{
      type: Schema.Types.ObjectId,
      ref:  'Person'
    }],
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now}
  }],
  reads:    Number,
  timeRead: Number,
  date:     {
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
  },
  uri: String
})

/* eslint-disable no-invalid-this, no-unreachable */
storySchema.pre('save', function(next) {
  this.dateUpdated = new Date()
  if (!this.dateCreated)
    this.dateCreated = this.dateUpdated
  next()
})
/* eslint-enable no-invalid-this, no-unreachable */

module.exports = storySchema
