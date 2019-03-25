var apiKey = "sos1819-01-1234567890";

const isValidApiKey = function (req, res, next) {
	if (!req.headers["sos1819-token"] || req.headers["sos1819-token"] !== apiKey)
		res.status(401).json({code: 401, msg: "Unauthorized"});
	else 
		next();
};

module.exports = isValidApiKey;