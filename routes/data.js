const express = require('express');
const router = express.Router();
const { usersCollection, postsCollection } = require('../models');

router.get('/create-user', function(req,res){
  var match = usersCollection.where({ username: 'quaid' });
  usersCollection.insert({
    username: "quaid",
    bio: "Hi. My name is Quaid. I write software"
  });
  console.log('create request received');

});

router.get('/create-examples', function(req,res){

  posts.insert([
    {title: "sphinx phalanx cyclops", body: "hello world", username: 'quaid' },
    {title: "hydra multi test", body: "hello world 2", username: 'quaid' }
  ]);

  console.log('create request received');

});

router.get('/delete-all', function(req,res){
  var users = usersCollection.items;

  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    usersCollection.remove(user.cid);
    console.log('removed user ' + user.cid + ' from database');
  }

  var posts = postsCollection.items;

  for (var i = 0, len = posts.length; i < len; i++) {
    var post = posts[i];
    postsCollection.remove(post.cid);
    console.log('removed post ' + post.cid + ' from database');
  }

});

module.exports = router;
