const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { User, Post } = require('../models')

router.get('/', function(req, res){
  Post.find()
      .populate( { path: 'author' } )
      .exec(function(err, posts) {
        console.log(posts)
        res.send(posts)
      })
})

router.get('/create', function(req,res){
  var newUser = User({
    _id: new mongoose.Types.ObjectId(),
    email: 'hello@kellymears.me',
    username: 'username',
    password: 'password',
    name: {
      first: 'first',
      last: 'last'
    },
    bio: 'bio'
  })
  newUser.save(function(err){
    if (err) console.log(err)
    console.log(newUser)
    res.send(newUser)
  })
})

router.get('/post-create', function(req,res){
  User.find({ username: 'username' }, function(err, user) {
    if (err) console.log(err)
    var newPost = Post({
      _id: new mongoose.Types.ObjectId(),
      title: 'grabbable title',
      subtitle: 'subtitle',
      body: 'body',
      author: user[0]._id,
    })
    newPost.save(function(err){
      if (err) console.log(err)
      res.send(newPost)
    })
  })
})

router.get('/@:username', function(req,res){
  User.find({ username: req.params.username }, function(err, user) {
    if (err) console.log(err)
    Post.
    find({'author.username': req.params.username }).
    exec(function (err, posts) {
      if (err) console.log(err)
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
