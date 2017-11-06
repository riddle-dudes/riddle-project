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
		connection.query('select riddles.id, riddles.text, riddles.correct, riddles.wrong from riddles where level=? and riddles.id not in (select riddle from riddles_correct where ? = riddles_correct.user);', [level, userId], function(err, result)
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
		connection.query("SELECT id, name, level, coins, token, attacking FROM users ORDER BY coins DESC", function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	updateRiddlePercent: function(id, column, cb)
	{
		connection.query("UPDATE riddles SET "+column+" = "+column+" + 1 WHERE id = ?;", [id], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	attack: function(attackerId, defenderId, cb)
	{
		connection.query("INSERT INTO attack(attacker, defender) VALUES (?, ?);", [attackerId, defenderId], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	attacking: function(id, attackBoolean, cb)
	{
		connection.query("UPDATE users SET attacking = ? WHERE id = ?;", [attackBoolean, id], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	getTimes: function(cb)
	{
		connection.query("SELECT id, time FROM attack", function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	getAttacker: function(id, cb)
	{
		connection.query("SELECT attacker FROM attack WHERE id in (?);", [id], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	getDefender: function(id, cb)
	{
		connection.query("SELECT defender FROM attack WHERE id = ?;", [id], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	updateCoinsFromAttack: function(id1, id2, coins1, coins2, cb)
	{
		connection.query("UPDATE users SET coins = CASE id WHEN "+id1+" THEN "+coins1+" WHEN "+id2+" THEN "+coins2+" END WHERE id IN ("+id1+", "+id2+");", function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	deleteAttack: function(id, cb)
	{
		connection.query("DELETE FROM attack WHERE id = ?;", [id], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	}
};

module.exports = orm;