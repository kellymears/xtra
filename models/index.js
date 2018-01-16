var mongoose = require('mongoose')
const databaseConfig = require('./config').database

mongoose.connect(`mongodb://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}`)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('mongoose connection successful')
})

var personSchema = require('./person')
var storySchema = require('./story')

module.exports = {
  Person: mongoose.model('Person', personSchema),
  Story:  mongoose.model('Story', storySchema)
}
