var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
	console.log("Connecting to db ", config.db);
    mongoose.connect(config.db);
	require('../models/user.server.model');
};