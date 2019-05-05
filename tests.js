exports.config = {
	seleniumAddress: "http://localhost:4444/wd/hub",
	chromeOnly: true,
	fixSessionCapabilities: false,
	specs: ["TC01-loadData.js"]
};