let express = require("express");
let app = express();
let morgan = require("morgan");
let bodyParser = require("body-parser");
let api = require("./app/services/api");
let apiProxyCache = require("./app/services/cache-api-proxy");
let mongoDB = require('./app/services/mongoDB');
var jwt = require("jsonwebtoken");
let config = require("config");

//don't show the log when it is test
//use morgan to log at command line
if (config.util.getEnv("NODE_ENV") !== "test") {
  app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

//create api cache for proxyed api
apiProxyCache.init(app);

//create api endpoint
api.init(app);

//start server and listen to port
app.listen(config.port);
console.log("Listening on port " + config.port);

function verifyToken(token) {
  let promise = jwt.verify(token, config.secret, function(err, decoded) {
    return decoded;
  });
}

module.exports = app;
