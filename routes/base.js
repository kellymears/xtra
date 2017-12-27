const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { User, Post } = require('../models')

router.get('/', function(req, res){
  Post.find().populate('author').exec(function(err, posts) {
    res.render('index', {
      posts: posts
    })
    next()
  })
})

router.get('/@:username', function(req,res){
  User.findOne({ username: req.params.username })
  .exec(function(err,user) {
    Post.find({ author: user._id })
    .populate({ path: 'author' })
    .exec(function(err, posts) {
      res.render('user', {
        author: user,
        posts: posts
      })
      next()
    })
  })
})

router.get('/@:username/:post', function(req,res){
  Post.find({
    title: decodeURIComponent(req.params.post)
  }).populate({
    path: 'author',
    match: {
      username: req.params.username
    }
  }).exec(function(err, posts) {
    res.render('post', {
      posts: posts
    })
    next()
  })
})

module.exports = router
