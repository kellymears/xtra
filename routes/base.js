const express = require('express');
const router = express.Router();
const { usersCollection, postsCollection } = require('../models');


/* view index */
router.get('/', function(req, res){
  var posts = postsCollection.items;

  res.render('index', {
    posts: posts
  });

  console.log('index accessed')
});

/* view user */
router.get('/@:username/', function(req,res){
  var user = usersCollection.where({ username: req.params.username });
  var posts = postsCollection.where({ username: req.params.username });

  res.render('user', {
    user: user.items,
    posts: posts.items
  });

  console.log('user accessed')
});

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

/* create post */
router.get('/create', function(req,res){
  res.render('create');
  console.log('create accessed');
});

/* edit post */
router.get('/edit/@:username/:post', function(req,res){
  res.render('edit');
  console.log('edit accessed');
});

module.exports = router;
