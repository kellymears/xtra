const express = require('express')
const app = express()
const http = require('http').Server(app)

var locallydb = require('locallydb');
var db = new locallydb('dbiane');

app.set('view engine', 'ejs');

app.use(express.static('public'));

/* view index */
app.get('/', function(req, res){
  var collection = db.collection('posts');
  var posts = collection.items;
  res.render('index', {
    posts: posts
  });
  console.log('index accessed')
});

/* view user */
app.get('/@:username/', function(req,res){
  var users_collection = db.collection('users');
  var user = users_collection.where({ username: req.params.username });
  var posts_collection = db.collection('posts');
  var posts = posts_collection.where({ username: req.params.username });
  res.render('user', {
    user: user.items,
    posts: posts.items
  });
  console.log('user accessed')
});

/* view post */
app.get('/@:username/:post', function(req,res){
  var users_collection = db.collection('users');
  var user = users_collection.where({ username: req.params.username });
  var posts_collection = db.collection('posts');
  var posts = posts_collection.where("@username == '" + req.params.username + "' && @title == '" + req.params.post +"'");
  res.render('post', {
    user: user.items,
    posts: posts.items
  });
  console.log('post accessed');
});

/* create post */
app.get('create', function(req,res){
  res.render('create');
  console.log('create accessed');
});

/* edit post */
app.get('edit/@:username/:post', function(req,res){
  res.render('edit');
  console.log('edit accessed');
});



/* all of what follows is junk so i can manipulate db,
   populate with example content, etc. */

app.get('/data/create-user', function(req,res){
  var users = db.collection('users');
  var match = users.where({ username: 'quaid' });
  users.insert({
    username: "quaid",
    bio: "Hi. My name is Quaid. I write software"
  });
  console.log('create request received');
});

app.get('/data/create-examples', function(req,res){
  var posts = db.collection('posts');
  posts.insert([
    {title: "sphinx phalanx cyclops", body: "hello world", username: 'quaid' },
    {title: "hydra multi test", body: "hello world 2", username: 'quaid' }
  ]);
  console.log('create request received');
});

app.get('/data/delete-all', function(req,res){
  var users_collection = db.collection('users');
  var users = users_collection.items;
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    users_collection.remove(user.cid);
    console.log('removed user ' + user.cid + ' from database');
  }
  var collection = db.collection('posts');
  var posts = collection.items;
  for (var i = 0, len = posts.length; i < len; i++) {
    var post = posts[i];
    collection.remove(post.cid);
    console.log('removed post ' + post.cid + ' from database');
  }
});

/* server listen */
http.listen(8888, function() {
  console.log('listening on *:8888');
});
