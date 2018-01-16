var mongoose = require('mongoose')
var Schema = mongoose.Schema

var postSchema = new Schema({
  title:    String,
  subtitle: String,
  author:   {type: Schema.Types.ObjectId, ref: 'User'},
  body:     String,
  date:     {
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
  }
})

postSchema.pre('save', function(next) {
  this.date.updated = new Date()
  if (!this.date.created)
    this.date.created = this.date.updated
  next()
})

module.exports = postSchema
