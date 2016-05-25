"use strict";

var rabbit = require("wascally");
var config = require("./../config/config");

/* ====================================================== */
/*                       Receivers                        */
/* ====================================================== */

var EmailReceiver = require("./email/email_receiver");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

rabbit.configure(config)
	.then(function () {

		// List of messages we want to listen to and react
		rabbit.handle("test.email.send", EmailReceiver.handleSendEmail);

		// Subscribe to the queue where these messages will come from
		rabbit.startSubscription("email-queue");
	})
	.then(undefined, function (err) {
		console.log("Report Error!", err.message);
	});