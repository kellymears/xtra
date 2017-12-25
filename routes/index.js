const base = require('./base');
const data = require('./data');
const api = require('./api');

// Export all routes for use in this project.
module.exports = (app) => {
	app.use('/', base);
	app.use('/data', data);
	app.use('/api', api);
};
