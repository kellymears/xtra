const express = require('express')
const router = express.Router()
const { User, Post } = require('../models')

router.get('/', function(req, res){
  Post.find({}, function(err, posts) {
    if (err) throw err;
    res.render('index', {
      posts: posts
    })
  })
})

/* need to figure out how to render the results of multiple queries */
router.get('/@:username', function(req,res){
  /* query 1 */
  User.find({}, function(err, users){
    if (err) throw err;
  })
  /* query 2 */
  Post.find({}, function(err, posts){
    if (err) throw err;
  })
  /* render */
  res.render('user', {
    user: users,
    posts: posts,
  })
})

router.get('/@:username/:post', function(req,res){
  User.find({}, function(err, users){
    if (err) throw err;
  })
  Post.find({}, function(err, posts){
    if (err) throw err;
  })
})

/* everything below is crap */

/* view post */
router.get('/@:username/:post', function(req,res){
  var user = usersCollection.where({ username: req.params.username });
  var posts = postsCollection.where("@username == '" + req.params.username + "' && @title == '" + req.params.post +"'");

  res.render('post', {
    user: user.items,
    posts: posts.items
  });

  console.log('post accessed');
});

module.exports = router;
