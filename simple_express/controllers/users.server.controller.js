var User = require('mongoose').model('User');

exports.create = function(req, res, next) {
	var user = new User(req.body);
	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			return res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		console.log("Got ", users.length, " users");
		if (err) {
			console.log("Error", err);
			return next(err);
		} else {
			res.json(users);
		}
	});
};

exports.createRandom = function(req, res, next) {
	var user = new User();
	user.firstName = "Mark";
	user.lastName = "Stranger";
	user.username = "mstranger";
	user.email = "mstranger@yahoo.com";
	user.password = "abc123";
	user.save(function (err) {
		if (err) {
			return next(err);
		} else {
			return res.json(user);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);	
};

exports.findByUserName = function(req, res, next, userName) {
	User.findOne({ 'username': userName}, 
		function(err, user) {
			if (err) {
				next(err);
			} else {
				req.user = user;
				next();
			}
		});
};

exports.update = function(req, res, next) {
	User.findBIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			return res.json(user);
		}
	});
};

exports.remove = function(req, res, next) {
	req.user.remove(function (err) {
		if (err) {
			return next(err);
		} else {
			return res.json(user);
		}
	})
};

exports.findMale = function(req, res, next) {
	User.findMales(function(err, users) {
		if (err) {
			return next(err);
		} else {
			return res.json(users);
		}
	});
};

exports.checkPwd = function(req, res, next) {
	res.send("Password is strong? " + req.user.checkPwd());
};