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
	handleSendEmail : handleSendEmail
};

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

function handleSendEmail (message) {

	console.log("Received Send Email Request!");

	var options = {
		emailTo : message.body.emailTo,
		subject : message.body.subject,
		text    : message.body.text
	};

	EmailService.sendEmail(options)
		.then(function () {
			message.ack();
		})
		.catch(function () {
			message.nack();
		});
}
