var request = require('request');
var nodemailer = require('nodemailer');

var models = require('./models');
var checker = require('./checker');

var program = require('./cmdArgs');

console.log('Welcome ! So you want an '+ program.wantedModel);
console.log('The part number is : '+ program.wantedPartNumber);
console.log('We will now check the availability for you !')

checker(program.countryCode, program.locale, program.wantedPartNumber, function(err, availability) {
	if(err) { return console.error(err); }

	console.log('');
	console.log('----------------------------------');
	console.log('Stores :');
	console.log('----------------------------------');
	for(var storeNumber in availability) {
		var store = availability[storeNumber];
		console.log('  '+ store.storeName +' : '+ ((store.availability) ? 'Available' : 'Not available'));
	}
	console.log('');
});