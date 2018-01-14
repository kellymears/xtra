const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { User, Post, Person, Story } = require('../models')

router.get('/person/check/:username', function(req,res){
  Person.findOne({ username: req.params.username })
  .exec(function(err,person) {
    if (err) return res.send(err)
    if(!person) return res.send('new')
    res.send('existing')
  })
})

router.post('/person/create/', function(req,res){
  var newPerson = Person({
    _id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    name: {
      first: req.body.name.first,
      last: req.body.name.last
    },
    picture: req.body.picture,
    gender: req.body.gender,
    auth: {
      id: req.body.auth.id,
      access: req.body.auth.access
    }
  })
  console.log(newPerson)
  newPerson.save(function(err){
    if (err) console.log(err)
    res.json({
      response: 'mad success!',
      person: newPerson
    })
  })
})

router.post('/person/update/', function(req,res){
  Person.findOneAndUpdate({ _id: req.body.id },
    { $set: {
        auth: {
          id: req.body.update.auth.id,
          access: req.body.update.auth.access
        },
        date_accessed: Date.now()
      }
    },
    { new: true },
    function(err,person){
      if(err) return res.send(err)
      return res.json(person)
    }
  )
})

router.get('/story/get/:person/:story', function(req,res){
  console.log('api request for story data received: ' + req.params)
  console.log(req.params)
  Post.find({
    title: decodeURIComponent(req.params.story)
  }).populate({
    path: 'author',
    match: {
      username: req.params.person
    }
  }).exec(function(err, story) {
    console.log(story[0])
    res.json(story[0])
  })
})

/* junk after here */

router.get('/person/get/:id', function(req,res){
  let id = decodeURIComponent(req.params.id)
  console.log(id)
  Person.findOne({ _id: id })
  .exec(function(err,person) {
    if(err) res.send(err)
    if(person) return res.json({ person: person })
    return res.json(null)
  })
})

router.get('/story/get/:person/:story', function(req,res){
  console.log('api request for post data received')
  console.log(req.params)
  Post.find({
    title: decodeURIComponent(req.params.story)
  }).populate({
    path: 'author',
    match: {
      username: req.params.person
    }
  }).exec(function(err, story) {
    console.log(story[0])
    res.json(story[0])
  })
})

router.get('/posts/get', function(req,res){
  console.log('api request for post data received')
  Post.find().populate('author').exec(function(err, posts) {
    console.log(posts)
    res.json(posts)
  })
})

router.get('/user/get/:username', function(req,res){
  User.findOne({ username: req.params.username })
  .exec(function(err,user) {
    if(user) {
      Post.find({ author: user._id })
      .populate({ path: 'author' })
      .exec(function(err, posts) {
        return res.json({ user: user, posts: posts })
      })
    }
    if(err) {
      return res.json({status: 500, error: err})
    }
  })
})

router.get('/users/get', function(req,res){
  User.find()
  .exec(function(err,users) {
    if(users) {
        return res.json(users)
    }
    else {
      return res.json(null)
    }
  })
})

router.post('/user/create', function(req, res){
  var newUser = User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    name: {
      first: req.body.first,
      last: req.body.last
    },
    bio: req.body.bio
  })
  newUser.save(function(err){
    if (err) return console.log(err)
    return res.json(newUser)
  })
})

router.post('/post/create', function(req,res){
  var newPost = Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    subtitle: req.body.subtitle,
    body: req.body.body,
    author: req.body.author,
  })
  newPost.save(function(err){
    if (err) return console.log(err)
    return res.json(newPost)
  })
})

module.exports = router
