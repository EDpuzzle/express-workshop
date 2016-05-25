"use strict";

// ============================================ //
//        DANGER AREA:  untested code           //
// ============================================ //


var rabbit = require("wascally");
var config = require("./../config/config");

/* ====================================================== */
/*                       Services                         */
/* ====================================================== */

var EmailService = require("./../../../../services/email/email_service");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
	sendEmail : sendEmail
};

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

function sendEmail (options) {
	return new Promise(function (resolve, reject) {

		// Wascally has a different implementation of Promises
		// so we have to wrap their implementation with the
		// Promises we are using across the application
		rabbit.configure(config)
			.then(function () {
				rabbit.publish("email-queue", {
					type       : "test.email.send",
					routingKey : "",
					body : {
						emailTo : options.emailTo,
						subject : options.subject,
						text    : options.text 
					}
				});
			})
			.then(function () {
				return resolve();
			}, function (err) {
				console.log("Report Error!", err.message);
				return reject(err);
			});
	});
}
