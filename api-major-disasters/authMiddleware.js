const jwt = require('jsonwebtoken');

const isValidApiKey = function (req, res, next) {
	var token = req.headers.authorization;
	    if(!token){
			return res.status(401).send({
				error: "Es necesario el token de autenticación"
		    });
	    }
	    token = token.replace('Bearer ', '');
	    jwt.verify(token, 'salt', function(err, user) {
		      if (err) {
			        res.status(401).send({
				          error: 'Token inválido'
			        });
		      } else {
			     next();
		      }
	    });
};


module.exports = isValidApiKey;