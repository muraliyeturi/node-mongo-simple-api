let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let config = require('config'); //we load the db location from the JSON files
var jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens
let api = require('./app/api');
//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
	//use morgan to log at command line
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

let db = mongoose.connect(config.DBHost, config.options);

// verify token for every request
app.use(function(req, res, next) {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	res.append('Access-Control-Allow-Headers', 'token');
	if(req.url !== '/login' && req.url !== '/user') {
			let _res = res;
			jwt.verify(req.headers.token, config.secret, function(err, decoded) {
	 	  	if(decoded) {
					next();
				} else {
					_res.json({message:"invalide token, please relogin"});
				}
		 	});
	} else {
		next();
	}
});


api.init(app);
app.listen(config.port);
console.log("Listening on port " + config.port);

function verifyToken(token) {
	let promise = jwt.verify(token, config.secret, function(err, decoded) {
  	return decoded;
	});
}

module.exports = app;
