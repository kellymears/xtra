const express = require('express')
const router = express.Router()

router.get('/', function(req, res){
  res.send("what are you doing here? i hope you're a friend ;)")
})

module.exports = router
