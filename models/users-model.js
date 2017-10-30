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
		orm.selectEmail("users", email, function(result)
		{
			cb(result);
		});
	},

	createUser: function(name, email, password, token, cb)
	{
		orm.create("users", name, email, password, token, function(result)
		{
			cb(result)
		});
	},

	update: function(id, cb)
	{
		orm.updateOne("burgers", id, function(result)
		{
			cb(result)
		});
	}
};

module.exports = user;