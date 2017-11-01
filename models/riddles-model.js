var orm = require("../config/orm.js");

var riddle =
{
	findFromId: function(id, cb)
	{
		orm.findFromId("riddles", id, function(result)
		{
			cb(result)
		});
	},

	addRiddleCorrect: function(userId, riddleId, cb)
	{
		orm.addRiddleCorrect("riddles_correct", userId, riddleId, function(result)
		{
			cb(result)
		})
	},

	getRiddlesWithLevelNotSeen: function(userId, level, cb)
	{
		orm.getRiddlesWithLevelNotSeen("riddles", userId, level, function(result)
		{
			cb(result)
		})
	}
};

module.exports = riddle;