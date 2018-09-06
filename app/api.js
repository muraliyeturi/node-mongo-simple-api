let group = require('./routes/group');
let user = require('./routes/user');
let contact = require('./routes/contact');

 function init(app){
  app.get("/", (req, res) => res.json({message: "Welcome to our api!"}));

  app.route("/group")
  	.get(group.getGroups)
  	.post(group.postGroup);
  app.route("/group/:id")
  	.get(group.getGroup)
  	.delete(group.deleteGroup)
  	.put(group.updateGroup);

  app.route("/user")
  	.get(user.getUsers)
  	.post(user.postUser);
  app.route("/user/:id")
  	.get(user.getUser)
  	.delete(user.deleteUser)
  	.put(user.updateUser);

  app.route("/contact")
    .get(contact.getContacts)
    .post(contact.postContact);
  app.route("/contact/:id")
    .get(contact.getContact)
    .delete(contact.deleteContact)
    .put(contact.updateContact);

  app.route("/login")
    .post(user.login);
}

module.exports =  {init};
