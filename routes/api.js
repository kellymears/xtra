const express = require('express')
const router = express.Router()
const { User, Post } = require('../models')

router.post('/user/create', function(req, res){
  var newUser = User({
    username: req.body.username,
    bio: req.body.bio
  })
  newUser.save(function(err){
    if(err) throw err;
    console.log('created user ' + req.body.username)
  })
})

router.post('/post/create', function(req,res){
  var newPost = Post({
    title: req.body.title,
    subtitle: req.body.subtitle,
    user: req.body.username,
    body: req.body.postBody
  })
  newPost.save(function(err){
    if(err) throw err;
    console.log('created post "' + req.body.title + '"')
  })
})

module.exports = router
