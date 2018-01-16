const express = require('express')
const router = express.Router()

const aws = require('../modules/awsSign.js')

router.get('', function(req, res){
  res.send('files!')
})

module.exports = router
