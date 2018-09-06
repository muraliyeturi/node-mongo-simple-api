let mongoose = require('mongoose');
let Group = require('../models/group');
var jwt  = require('jsonwebtoken');
let config = require('config');

/*
 * GET /group route to retrieve all the group.
 */
function getGroups(req, res) {
	jwt.verify(req.headers.token, config.secret,
		function(err, decoded) {
			//Query the DB and if no errors, send all the groups
			let query = Group.find({createdById: decoded.user._id});
			query.exec((err, groups) => {
				if(err) res.send(err);
				//If no errors, send them back to the client
				res.json(groups);
			});
	});
}

/*
 * POST /group to save a new group.
 */
function postGroup(req, res) {
	jwt.verify(req.headers.token, config.secret,
		function(err, decoded) {
			req.body.createdById = decoded.user._id;
			//Creates a new group
			var newGroup = new Group(req.body);
			//Save it into the DB.
			newGroup.save((err,group) => {
				if(err) {
					res.send(err);
				}
				else { //If no errors, send it back to the client
					res.json({message: "Group successfully added!", group });
				}
			});
	});

}

/*
 * GET /group/:id route to retrieve a group given its id.
 */
function getGroup(req, res) {
	jwt.verify(req.headers.token, config.secret,
		function(err, decoded) {
			//Query the DB and if no errors, send all the groups
			let query = Group.find({createdById: decoded.user._id, _id: req.params.id});
			query.exec((err, groups) => {
				if(err) res.send(err);
				//If no errors, send them back to the client
				res.json(groups);
			});
	});
}

/*
 * DELETE /group/:id to delete a group given its id.
 */
function deleteGroup(req, res) {
	Group.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Group successfully deleted!", result });
	});
}

/*
 * PUT /group/:id to updatea a group given its id
 */
function updateGroup(req, res) {
	Group.findById({_id: req.params.id}, (err, group) => {
		if(err) res.send(err);
		Object.assign(group, req.body).save((err, group) => {
			if(err) res.send(err);
			res.json({ message: 'Group updated!', group });
		});
	});
}

//export all the functions
module.exports = { getGroups, postGroup, getGroup, deleteGroup, updateGroup };
