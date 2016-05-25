"use strict";

var nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// To make this work you will have to configure your email's SMTP
var transporter = nodemailer.createTransport("smtps://user%40gmail.com:pass@smtp.gmail.com");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
	sendEmail : sendEmail
};

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

function sendEmail (options, callback) {
	return new Promise(function (resolve, reject) {
		return resolve();
		
		// setup e-mail data with unicode symbols
		var mailOptions = {
		  from    : '"Fred Foo 👥" <foo@blurdybloop.com>',
		  to      : options.emailTo,
		  subject : options.subject,
		  text    : options.text,
		  html    : "<b>" + options.text + "</b>"
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function (err, info) {
	    if (err) return reject(err);
	    
	    return resolve();
		});

	});
}
