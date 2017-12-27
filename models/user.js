var Schema = require('mongoose').Schema

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  bio: String,
  name: {
    first: String,
    last: String
  },
  date: {
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  }
})

userSchema.pre('save', function(next) {
  this.date.updated = new Date()
  if (!this.date.created)
    this.date.created = currentDate
  next()
})

userSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last
})

module.exports = userSchema
