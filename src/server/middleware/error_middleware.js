"use strict";

var boom = require("boom");

module.exports = function (err, req, res, next) {
	console.log("======= ERROR DETECTED ========");

	var error = err.isBoom ? err : boom.wrap(err);

	// 1. Send this error to your error analytics tool of choice
	// examples: NewRelic, Rollbar.io, your custom made one, etc.
	// (...)


	// 2. Make the API respond accordingly
	if (err.isServer) {

		// If we have a server error, respond with a generic message
		// We don't want to leak internal server information publically
		return res.status(err.output.statusCode).json({
			message: "Internal server error"
		});
	} else {
		return res.status(err.output.statusCode).json({
			message: err.message
		});
	}
};
