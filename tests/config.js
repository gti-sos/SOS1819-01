

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	/*
	capabilities: {
	       'directConnect': true,
	       'browserName': 'chrome',
	       chromeOptions: {
	           args: ["--headless", "--disable-gpu", "--window-size=800x600"]
	       }
	   },*/
	chromeOnly: true,
	capabilities: {
	    'browserName': 'phantomjs',
	},
	specs: [
		'TC-majorDisasters.js',
		'TC-hurricanes.js'
	]

};
