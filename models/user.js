var Schema = require('mongoose').Schema

var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { runSettersOnQuery: true })

userSchema.pre('init', function(next, data) {
  User.populate(data, {
    path: 'posts'
  }, function(err, user) {
    data = user
    next()
  })
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
