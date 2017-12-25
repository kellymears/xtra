const base = require('./base');
const api = require('./api');

// Export all routes for use in this project.
module.exports = (app) => {
	app.use('/', base);
	app.use('/api', api);
};
