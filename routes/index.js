const base = require('./base');
const data = require('./data');

// Export all routes for use in this project.
module.exports = (app) => {
	app.use('/', base);
	app.use('/data', data);
};
