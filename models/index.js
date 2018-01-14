var mongoose = require('mongoose')
mongoose.connect('mongodb://xtrauser:xtrapassword@ds131237.mlab.com:31237/xtra')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('mongoose connection successful')
})

var userSchema = require('./user')
var personSchema = require('./person')
var postSchema = require('./post') //deprecated
var storySchema = require('./story')

module.exports = {
	User: mongoose.model('User', userSchema),
  Person: mongoose.model('Person', personSchema),
	Post: mongoose.model('Post', postSchema),
  Story: mongoose.model('Story', storySchema)
}
