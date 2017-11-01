var orm = require("../config/orm.js");

var riddle =
{
	findFromId: function(id, cb)
	{
		orm.findFromId("riddles", id, function(result)
		{
			cb(result)
		});
	}
};

module.exports = riddle;