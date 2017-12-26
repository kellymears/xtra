var mongoose = require('mongoose')
mongoose.connect('mongodb://xtrauser:xtrapassword@ds131237.mlab.com:31237/xtra')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('mongoose connection successful')
})

var userSchema = require('./user')
var postSchema = require('./post')

module.exports = {
	User: mongoose.model('User', userSchema),
	Post: mongoose.model('Post', postSchema),
}
