var program = require('commander');

var models = require('./models');

program
	.version('0.0.1')
	.option('-m, --model [model]', 'Model (iphone6/iphone6plus)', 'iphone6')
	.option('-s, --size [size]', 'Size (16/64/128)', '64')
	.option('-c, --color [color]', 'Color (grey/silver/gold)', 'grey')
	.option('-cc, --countryCode [countryCode]', 'Country code (ex: CH, US, ...)', 'CH')
	.option('-l, --locale [locale]', 'Locale code (ex: fr_CH, en_US, ...)', 'fr_CH')
	.parse(process.argv);

if(['iphone6', 'iphone6plus'].indexOf(program.model) == -1) {
	console.error('Please select a valid model.');
	program.help();
}

if(['16', '64', '128'].indexOf(program.size) == -1) {
	console.error('Please select a valid size.');
	program.help();
}

if(['grey', 'silver', 'gold'].indexOf(program.color) == -1) {
	console.error('Please select a valid color.');
	program.help();
}

program.wantedModel = models[program.model].name +' '+ models[program.model].sizes[program.size].name +' '+ models[program.model].sizes[program.size].colors[program.color].name;
program.wantedPartNumber = models[program.model].sizes[program.size].colors[program.color].partNumber;

module.exports = program;