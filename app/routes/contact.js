let mongoose = require('mongoose');
let Contact = require('../models/contact');
var jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens
let config = require('config');

/*
 * GET /Contact route to retrieve all the Contacts.
 */
function getContacts(req, res) {
	jwt.verify(req.headers.token, config.secret,
		function(err, decoded) {
		//Query the DB and if no errors, send all the Contacts
		let query = Contact.find({createdById: decoded.user._id});
		query.exec((err, contacts) => {
			if(err) res.send(err);
			//If no errors, send them back to the client
			res.json(contacts);
		});
	});
}

/*
 * POST /Contact to save a new Contact.
 */
function postContact(req, res) {
	jwt.verify(req.headers.token, config.secret,
		function(err, decoded) {
			req.body.createdById = decoded.user._id;
			//Creates a new Contact
			var newContact = new Contact(req.body);
			//Save it into the DB.
			newContact.save((err,contact) => {
				if(err) {
					res.send(err);
				}
				else { //If no errors, send it back to the client
					res.json({message: "Contact successfully added!", contact });
				}
			});
	});
}

/*
 * GET /Contact/:id route to retrieve a Contact given its id.
 */
function getContact(req, res) {
	jwt.verify(req.headers.token, config.secret,
		function(err, decoded) {
		//Query the DB and if no errors, send all the Contacts
		let query = Contact.find({createdById: decoded.user._id, _id: req.params.id});
		query.exec((err, contacts) => {
			if(err) res.send(err);
			//If no errors, send them back to the client
			res.json(contacts);
		});
	});
}

/*
 * DELETE /Contact/:id to delete a Contact given its id.
 */
function deleteContact(req, res) {
	Contact.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Contact successfully deleted!", result });
	});
}

/*
 * PUT /Contact/:id to updatea a Contact given its id
 */
function updateContact(req, res) {
	Contact.findById({_id: req.params.id}, (err, contact) => {
		if(err) res.send(err);
		Object.assign(contact, req.body).save((err, contact) => {
			if(err) res.send(err);
			res.json({ message: 'Contact updated!', contact });
		});
	});
}

//export all the functions
module.exports = { getContacts, postContact, getContact, deleteContact, updateContact };
