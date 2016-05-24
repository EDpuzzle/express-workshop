"use strict";

module.exports = function (err, req, res, next) {
	console.log("======= ERROR DETECTED ========");
	throw err;
};
