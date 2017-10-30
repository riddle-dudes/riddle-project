var connection = require('../config/connection.js');

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}
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