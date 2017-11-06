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

	findFromId: function(id, cb)
	{
		orm.findFromId("users", id, function(result)
		{
			cb(result);
		})
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
	},

	updateUser: function(id, coins, level, cb)
	{
		orm.updateUser(id, coins, level, function(result)
		{
			cb(result)
		})
	},

	populateTable: function(cb)
	{
		orm.populateTable(function(result)
		{
			cb(result)
		})
	},

	attacking: function(id, attackBoolean, cb)
	{
		orm.attacking(id, attackBoolean, function(result)
		{
			cb(result)
		})
	},

	updateCoinsFromAttack: function(id1, id2, coins1, coins2, cb)
	{
		orm.updateCoinsFromAttack(id1, id2, coins1, coins2, function(result)
		{
			cb(result)
		})
	}
};

module.exports = user;