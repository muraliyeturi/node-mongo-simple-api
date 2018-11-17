let user = require('../routes/user');

init = (app) => {
   // verify token for every request
   app.use(function(req, res, next) {
     res.append("Access-Control-Allow-Origin", ["*"]);
     res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
     res.append("Access-Control-Allow-Headers", "Content-Type");
     res.append("Access-Control-Allow-Headers", "token");
     let _res = res;

     if (
       req.url !== "/login" &&
       req.url !== "/user" &&
       req.url.indexOf("/api/") !== 0
     ) {
       jwt.verify(req.headers.token, config.secret, function(err, decoded) {
         if (decoded) {
           next();
         } else {
           _res.json({ message: "invalide token, please relogin" });
         }
       });
     } else {
       next();
     }
   });

  app.get("/", (req, res) => res.json({message: "Welcome to our api!"}));

  app.route("/user")
  	.get(user.getUsers)
  	.post(user.postUser);
  app.route("/user/:id")
  	.get(user.getUser)
  	.delete(user.deleteUser)
  	.put(user.updateUser);

  app.route("/login")
    .post(user.login);
}

module.exports =  {init};
