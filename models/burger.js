var orm = require("../config/orm.js");

var burger =
{
	all: function(cb)
	{
		orm.selectAll("burgers", function(result)
		{
			cb(result);
		});
	},

	insert: function(name, cb)
	{
		orm.insertOne("burgers", name, function(result)
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

module.exports = burger;