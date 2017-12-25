const express = require('express')
const mongoose = require('mongoose')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')

const routes = require('./routes')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)

http.listen(8888, function() {
  console.log('listening on *:8888')
})
