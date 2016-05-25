"use strict";

var boom = require("boom");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
	syncTodos : syncTodos
};

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

function syncTodos (options, callback) {
	return new Promise(function (resolve, reject) {
		return resolve();
		
		// Call the Wunderlist API to import all your TODOS

	});
}
