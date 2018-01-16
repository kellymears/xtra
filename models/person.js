var Schema = require('mongoose').Schema

var personSchema = new Schema({
  _id: {
    type:     String,
    required: true,
    unique:   true
  },
  username: {
    type:     String,
    required: true,
    unique:   true
  },
  email: {
    type:      String,
    lowercase: true
  },
  first_name:   String,
  last_name:    String,
  gender:       String,
  bio:          String,
  picture:      String,
  date_created: {
    type:    Date,
    default: Date.now
  },
  date_updated: {
    type:    Date,
    default: Date.now
  },
  date_accessed: {
    type:    Date,
    default: Date.now
  },
  auth: {
    id:     String,
    access: String
  }
})

personSchema.virtual('fullName').get(function(next) {
  return this.name.first + ' ' + this.name.last
  next()
})

module.exports = personSchema
