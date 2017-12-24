var mongoose = require('mongoose')
mongoose.connect('mongodb://xtrauser:xtrapassword@ds131237.mlab.com:31237/xtra')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('mongoose connection successful')
})

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
		bio: String
})

var postSchema = new Schema({
		title: String,
		subtitle: String,
		author: String,
		body: String,
		date: {
			type: Date,
			default: Date.now
		},
		meta: {
    	votes: Number,
    	favs:  Number
  	}
})

module.exports = {
	User: mongoose.model('User', userSchema),
	Post: mongoose.model('Post', postSchema),
}
