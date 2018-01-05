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

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://xtrarad.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:8888/',
    issuer: "https://xtrarad.auth0.com/",
    algorithms: ['RS256']
})

routes(app)

http.listen(8888, function() {
  console.log('listening on *:8888')
})
