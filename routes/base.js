const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { User, Post } = require('../models')

/* view index */
router.get('/', function(req, res){
  console.log('index accessed')
  Post.find({}, function(err, posts) {
    if (err) throw err;
    console.log(posts)
    res.render('index', {
      posts: posts
    })
  })
})

/* view user */
router.get('/@:username/', function(req,res){
  var user = usersCollection.where({ username: req.params.username })
  var posts = postsCollection.where({ username: req.params.username })
  res.render('user', {
    user: user.items,
    posts: posts.items
  })
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
