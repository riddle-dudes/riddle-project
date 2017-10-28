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

	insertOne: function(table, burger_name, cb)
	{
		connection.query('INSERT INTO '+table+'(burger_name, devoured) VALUES (?, false);', [burger_name], function(err, result)
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