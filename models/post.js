var Schema = require('mongoose').Schema

var postSchema = new Schema({
  _id: Schema.Types.ObjectId,
	title: String,
	subtitle: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	body: String,
  date: {
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
	meta: {
    clappers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: Number
  },
})

postSchema.pre('init', function(next, data) {
  Post.populate(data, {
    path: 'author'
  }, function(err, post) {
    data = post
    next()
  })
})

postSchema.pre('save', function(next) {
  this.date.updated = new Date()
  if (!this.date.created)
    this.date.created = this.date.updated
  next()
})

postSchema.virtual('edited').get(function () {
  if (this.date.created != this.date.updated)
    return true
})

module.exports = postSchema
