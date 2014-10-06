var request = require('request');

module.exports = function(countryCode, locale, wantedPartNumber, callback) {
	request('https://reserve.cdn-apple.com/'+ countryCode +'/'+ locale +'/reserve/iPhone/stores.json', function (error, response, body) {
		if(error) { return callback(error); }

		body = JSON.parse(body);

		var storesByNumber = {};
		body.stores.forEach(function(store) {
			if(store.storeEnabled) {
				storesByNumber[store.storeNumber] = store.storeName;
			}
		});

		request('https://reserve.cdn-apple.com/'+ countryCode +'/'+ locale +'/reserve/iPhone/availability.json', function (error, response, body) {
			if(error) { return callback(error); }

			var availability = JSON.parse(body);

			var storesAvailability = {};
			for(var storeNumber in availability) {
				if(storesByNumber[storeNumber]) {
					storesAvailability[storeNumber] = {
						'storeName': storesByNumber[storeNumber],
						'availability': availability[storeNumber][wantedPartNumber]
					};
				}
			}

			callback(null, storesAvailability);
		});
	});
};