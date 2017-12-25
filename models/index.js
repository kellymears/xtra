var mongoose = require('mongoose')
mongoose.connect('mongodb://xtrauser:xtrapassword@ds131237.mlab.com:31237/xtra')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('mongoose connection successful')
})

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
	bio: String,
  name: {
    first: String,
    last: String
  }
})

userSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last
})

var postSchema = new Schema({
	title: String,
	subtitle: String,
	user: String,
	body: String,
	date: { type: Date, default: Date.now },
	meta: { claps: Number }
})

module.exports = {
	User: mongoose.model('User', userSchema),
	Post: mongoose.model('Post', postSchema),
}
