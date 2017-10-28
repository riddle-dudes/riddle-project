var mysql = require("mysql");
var connection = mysql.createConnection(
{
	host: "otmaa16c1i9nwrek.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "aqlmqbpyrbwx9fud",
	password: "aiexiw6aq63h68tm",
	database: "bqzftpqzzcha0u20"
});

/*if (process.env.JawsDB_URL)
{
	connection = mysql.createConnection(process.env.JAWSDB_URL);
}

else
{
	connection = mysql.createConnection(
	{
		host: "localhost",
		port: 3306,

		user: 'root',
		password: 'Lukkehoday1',
		database: "burgers_db"
	});
};*/

connection.connect(function(err)
{
	if(err){throw err}
})

module.exports = connection;