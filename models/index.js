var locallydb = require('locallydb');
var db = new locallydb('dbiane');

module.exports = {
	usersCollection: db.collection('users'),
	postsCollection: db.collection('posts'),
};
