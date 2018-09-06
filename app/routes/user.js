let mongoose = require('mongoose');
let User = require('../models/user');
var jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens
let config = require('config');

/*
 * GET /User route to retrieve all the Users.
 */
function getUsers(req, res) {
	//Query the DB and if no errors, send all the Users
	let query = User.find({});
	query.exec((err, Users) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(Users);
	});
}

/*
 * POST /User to save a new User.
 */
function postUser(req, res) {
	console.log(req.body)
	//Query the DB and if no errors, send all the Users
	let query = User.find({email: req.body.email});
	query.exec((err, Users) => {
		if(err) res.send(err);
		console.log(Users);
			if (Users.length === 0) {
				//Creates a new User
				var newUser = new User(req.body);
				//Save it into the DB.
				newUser.save((err,User) => {
					if(err) {
						res.send(err);
					}
					else { //If no errors, send it back to the client
						res.json({message: "User successfully added!", status:true, User });
					}
				});
			} else {
					res.json({message: "User exist. Please try differnt Email id", status: false});
			}

		});
}

/*
 * GET /User/:id route to retrieve a User given its id.
 */
function getUser(req, res) {
	User.findById(req.params.id, (err, User) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(User);
	});
}

/*
 * DELETE /User/:id to delete a User given its id.
 */
function deleteUser(req, res) {
	User.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "User successfully deleted!", result });
	});
}

/*
 * PUT /User/:id to updatea a User given its id
 */
function updateUser(req, res) {
	User.findById({_id: req.params.id}, (err, User) => {
		if(err) res.send(err);
		Object.assign(User, req.body).save((err, User) => {
			if(err) res.send(err);
			res.json({ message: 'User updated!', User });
		});
	});
}

function login(req, res) {
	const payload = {
		email: req.body.username
	}

	User.findOne(payload, (err, user) => {
	 if (err) throw err;

	 if (!user) {
		 res.json({ success: false, message: 'Authentication failed. User not found.' });
	 } else if (user) {
		 // check if password matches
		 if (user.password != req.body.password) {
			 res.json({message: 'Authentication failed. Wrong password.'});
		 } else {
			 // if user is found and password is right
			 // create a token with only our given payload
			 // we don't want to pass in the entire user since that has the password
			 const payload = {
				 user: user
			 };
			 var token = jwt.sign(payload, config.secret);
			 // return the information including token as JSON
			 res.json({
				 success: true,
				 message: 'succesfully Authenticated',
				 token: token,
				 role: user.role
			 });
		 }
	 }
 });
}

//export all the functions
module.exports = { getUsers, postUser, getUser, deleteUser, updateUser, login };
