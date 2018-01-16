const base = require('./base')
const api = require('./api')
const upload = require('./upload')

// Export all routes for use in this project.
module.exports = (app) => {
  app.use('/', base)
  app.use('/api', api)
  app.use('/upload', upload)
}
