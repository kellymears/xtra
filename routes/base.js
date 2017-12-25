const express = require('express')
const router = express.Router()
const { User, Post } = require('../models')

router.get('/', function(req, res){
  Post.find({}, function(err, posts) {
    User.find({}, function(err, users) {
      res.render('index', {
        posts: posts,
        users: users
      })
    })
  })
})

router.get('/@:username', function(req,res){
  User.find({ username: req.params.username }, function(err, user) {
    Post.
    find({'author.username': req.params.username }).
    exec(function (err, posts) {
      if (err) return handleError(err)
      res.render('user', {
        user: user,
        posts: posts
      })
    })
  })
})

router.get('/@:username/:post', function(req,res){
  Post.
  find({
    'author.username': req.params.username,
    title: decodeURIComponent(req.params.post)
  }).
  exec(function (err, posts) {
    if (err) return handleError(err)
    res.render('post', { posts: posts })
  })
})

module.exports = router
