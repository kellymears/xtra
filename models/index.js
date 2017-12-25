var mongoose = require('mongoose')
mongoose.connect('mongodb://xtrauser:xtrapassword@ds131237.mlab.com:31237/xtra')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('mongoose connection successful')
})

var Schema = mongoose.Schema

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

userSchema.pre('save', function(next) {
  this.date.updated = new Date()
  if (!this.date.created)
    this.date.created = currentDate
  next()
})

userSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last
})

var postSchema = new Schema({
  _id: Schema.Types.ObjectId,
	title: String,
	subtitle: String,
	author: {
    id: { type: Schema.Types.ObjectId, ref: 'User' },
    username : String
  },
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

module.exports = {
	User: mongoose.model('User', userSchema),
	Post: mongoose.model('Post', postSchema),
}
