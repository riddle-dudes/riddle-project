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

	getCoins: function(id1, id2, cb)
	{
		orm.getCoins(id1, id2, function(result)
		{
			cb(result)
		})
	}
};

module.exports = attack;