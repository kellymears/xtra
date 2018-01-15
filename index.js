const express = require('express')
const mongoose = require('mongoose')
const app = express()
const http = require('http').Server(app)

const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const cors = require('cors')

const bodyParser = require('body-parser')

const routes = require('./routes')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

routes(app)

http.listen(8888, function() {
  console.log('listening on *:8888')
})
