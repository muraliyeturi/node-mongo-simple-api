let request = require("request");
let apicache = require("apicache");
let cache = apicache.middleware;
const proxyAPI = "http://swapi.co";

init = (app) => {
  app.get("/api/*", cache("1 day"), (req, res) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    let _res = res;
    request(proxyAPI + req.url, { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      _res.send(
        JSON.parse(JSON.stringify(body).replace(/https:\/\/swapi.co\/api\b/g, ""))
      );
    });
  });
};

module.exports =  {init};
