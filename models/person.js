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
  firstName:   String,
  lastName:    String,
  gender:      String,
  bio:         String,
  picture:     String,
  dateCreated: {
    type:    Date,
    default: Date.now
  },
  dateUpdated: {
    type:    Date,
    default: Date.now
  },
  dateAccessed: {
    type:    Date,
    default: Date.now
  },
  auth: {
    id:     String,
    access: String
  }
})

/* eslint-disable no-invalid-this, no-unreachable */
personSchema.virtual('fullName').get(function(next) {
  return this.name.first + ' ' + this.name.last
  next()
})
/* eslint-enable no-invalid-this, no-unreachable */

module.exports = personSchema
