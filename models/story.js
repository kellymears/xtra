var mongoose = require('mongoose')
var Schema = mongoose.Schema

var storySchema = new Schema({
	title: String,
	subtitle: String,
	author: {
    type: String,
    ref: 'Person'
  },
	image: String,
	body: String,
  topics: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  }],
  bookmarks: Number,
  reactions: [{
		type: Schema.Types.ObjectId,
		ref:'Person'
	}],
  comments: [{
    text: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    },
		likes: [{
			type: Schema.Types.ObjectId,
			ref: 'Person'
		}],
		dislikes: [{
			type: Schema.Types.ObjectId,
			ref: 'Person'
		}],
		date_created: { type: Date, default: Date.now },
		date_updated: { type: Date, default: Date.now }
  }],
	reads: Number,
	time_read: Number,
  date: {
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
	uri: String,
})

storySchema.pre('save', function(next) {
  this.date.updated = new Date()
  if (!this.date.created)
    this.date.created = this.date.updated
  next()
})

module.exports = storySchema
