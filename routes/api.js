const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { Person, Story } = require('../models')

/* persons/profiles */
router.get('/person/get/all', function(req,res){
  console.log('request for all people data received')
  Person.find().exec(function(err, people) {
    return res.json(people)
  })
})

router.get('/person/get/:username', function(req,res){
  let username = decodeURIComponent(req.params.username)
  Person.findOne({ username: username })
  .exec(function(err,person) {
    if(err) return res.send(err)
    if(person) return res.json({ person: person })
    return res.json(null)
  })
})

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
    first_name: req.body.first_name,
    last_name: req.body.last_name,
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

/* stories */
router.post('/story/create', function(req,res){
  var newStory = Story({
    _id: req.body._id,
    title: req.body.title,
    subtitle: req.body.subtitle,
    body: req.body.body,
    author: req.body.author,
  })
  newStory.save(function(err){
    if (err) return console.log(err)
    console.log(newStory)
    return res.json(newStory)
  })
})

router.get('/story/get/:person/:story', function(req,res){
  Story.find({
    title: decodeURIComponent(req.params.story)
  }).populate({
    path: 'author',
    match: {
      username: req.params.person
    }
  }).exec(function(err, story) {
    console.log(story[0])
    if(err) return console.log(err)
    return res.json(story[0])
  })
})

router.get('/story/get/all', function(req,res){
  console.log('api request for all stories')
  Story.find().populate('author').exec(function(err, stories) {
    console.log(stories)
    res.json(stories)
  })
})

module.exports = router
