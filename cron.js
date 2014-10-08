var nodemailer = require('nodemailer');

var models = require('./lib/models');
var checker = require('./lib/checker');
var program = require('./lib/cmdArgs');
var config = require('./lib/config');

config.loadSync();

var transporter = nodemailer.createTransport(config.email.nodemailer);

var checkCron = function() {
	console.log('Checking availability...');

	var found = false;

	checker(program.countryCode, program.locale, program.wantedPartNumber, function(err, availability) {
		if(err) { 
			console.error(err);
			
			setTimeout(function() {
				checkCron();
			}, config.cron.interval);
		}

		for(var storeNumber in availability) {
			if(availability[storeNumber].availability === true) {
				console.log('iPhone 6 available at '+ availability[storeNumber].storeName +' Apple Store !');

				found = true;

				if(config.email.enabled) {
					transporter.sendMail({
						from: config.email.sendFrom,
					    to: config.email.sendTo,
					    subject: 'iPhone 6 available at '+ availability[storeNumber].storeName +' Apple Store !',
					    text: 'You wanted an '+ program.wantedModel +' and it seems available at the '+ availability[storeNumber].storeName +' Apple Store !\n\nhttps://reserve.cdn-apple.com/'+ program.countryCode +'/'+ program.locale +'/reserve/iPhone/availability'
					}, function(err, info) {
						if(err) { console.error(err); }
					});
				}
			}
		}

		if(!found) {
			console.log('Not available... Waiting '+ (config.cron.interval/1000/60) +' min')
		}

		setTimeout(function() {
			checkCron();
		}, config.cron.interval);
	});
}

checkCron();