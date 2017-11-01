var orm = require("../config/orm.js");

var user =
{
	all: function(cb)
	{
		orm.selectAll("users", function(result)
		{
			cb(result);
		});
	},

	getEmail: function(email, cb)
	{
		orm.selectEmail(email, function(result)
		{
			cb(result);
		});
	},

	getUser: function(email, password, cb)
	{
		orm.findUser(email, password, function(result)
		{
			cb(result)
		})
	},

	updateToken: function(id, token, cb)
	{
		orm.updateToken(id, token, function(result)
		{
			cb(result)
		})
	},

	createUser: function(name, email, password, token, cb)
	{
		orm.create("users", name, email, password, token, function(result)
		{
			cb(result)
		});
	},

	findFromToken: function(token, cb)
	{
		orm.findFromToken("users", token, function(result)
		{
			cb(result)
		});
	}
};

module.exports = user;