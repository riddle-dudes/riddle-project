var connection = require('../config/connection.js');

var orm = 
{
	selectAll: function(table, cb)
	{
		var query = "SELECT * FROM "+table;
		var thing = connection.query(query, function(err, result)
		{
			if(err){throw err};
			cb(result);
		});
	},

	selectEmail: function(email, cb)
	{
		connection.query("SELECT id FROM users WHERE email=?", [email], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	findUser: function(email, password, cb)
	{
		connection.query("SELECT id FROM users WHERE email=? AND password=?", [email,  password], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	updateToken: function(id, token, cb)
	{
		connection.query("UPDATE users SET token = ? WHERE id = ?", [token, id], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	create: function(table, name, email, password, token, cb)
	{
		connection.query('INSERT INTO '+table+'(name, email, password, token, level, coins) VALUES (?, ?, ?, ?, 1, 100);', [name, email, password, token], function(err, result)
		{
			if (err){throw err};
			cb(result);
		});
	},

	findFromId: function(table, id, cb)
	{
		connection.query("SELECT * FROM "+table+" WHERE id=?", [id], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	findFromToken: function(table, token, cb)
	{
		connection.query("SELECT * FROM "+table+" WHERE token=?", [token], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	addRiddleCorrect: function(table, userId, riddleId, cb)
	{
		connection.query('INSERT INTO '+table+'(user, riddle) VALUES (?,?);', [userId, riddleId], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	getRiddlesWithLevelNotSeen: function(table, userId, level, cb)
	{
		connection.query('select riddles.id, riddles.text from riddles where level=? and riddles.id not in (select riddle from riddles_correct where ? = riddles_correct.user);', [level, userId], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	updateUser: function(id, coins, level, cb)
	{
		connection.query('UPDATE users SET coins = ?, level = ? WHERE id = ?;', [coins, level, id], function(err, result)
		{
			if(err){throw err};
			cb(result);
		});
	},

	populateTable: function(cb)
	{
		connection.query("SELECT name, level, coins, token FROM users ORDER BY coins DESC", function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	}
};

module.exports = orm;