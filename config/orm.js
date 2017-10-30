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

	create: function(table, name, email, password, cb)
	{
		connection.query('INSERT INTO '+table+'(name, email, password, level, coins) VALUES (?, ?, ?, 1, 500);', [name, email, password], function(err, result)
		{
			if (err){throw err};
			cb(result);
		});
	},

	updateOne: function(table, id, cb)
	{
		connection.query('UPDATE '+table+' SET devoured = TRUE WHERE id = ?', [id], function(err, result)
		{
			if(err){throw err};
			cb(result);
		});
	}
};

module.exports = orm;