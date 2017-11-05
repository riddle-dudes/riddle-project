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
};

module.exports = attack;