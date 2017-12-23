const express = require('express')
const app = express()
const http = require('http').Server(app)

const routes = require('./routes');

app.set('view engine', 'ejs');

app.use(express.static('public'));

// Pulls in all of the routes from the routes folder.
routes(app);

/* server listen */
http.listen(8888, function() {
  console.log('listening on *:8888');
});
