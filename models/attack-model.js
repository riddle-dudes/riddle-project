var orm = require("../config/orm.js");

var attack =
{
	attack: function(attackerId, defenderId, cb)
	{
		orm.attack(attackerId, defenderId, function(result)
		{
			cb(result);
		});
	},

	getTimes: function(cb)
	{
		orm.getTimes(function(result)
		{
			cb(result);
		})
	},

	getAttacker: function(id, cb)
	{
		orm.getAttacker(id, function(result)
		{
			cb(result)
		})
	},

	getDefender: function(id, cb)
	{
		orm.getDefender(id, function(result)
		{
			cb(result)
		})
	},

	deleteAttack: function(id, cb)
	{
		orm.deleteAttack(id, function(result)
		{
			cb(result)
		})
	}
};

module.exports = attack;