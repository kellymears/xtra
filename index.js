const express = require('express')
const app = express()
const http = require('http').Server(app)

const cors = require('cors')

const bodyParser = require('body-parser')

const routes = require('./routes')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

routes(app)

http.listen(8888)
