const express = require('express')
const router = express.Router()

router.get('/', function(req, res){
  return (
    "what are you doing here? i hope you're a friend ;)"
  )
})

module.exports = router
