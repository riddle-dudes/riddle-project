var mysql = require("mysql");
var connection = mysql.createConnection(
{
	host: "o3iyl77734b9n3tg.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "gkkcbxxo8vtnc3aa",
	password: "l90lxmxztqrkq9z1",
	database: "bqzftpqzzcha0u20"
});

/*connection = mysql.createConnection(
{
	host: "localhost",
	port: 3306,

	user: 'root',
	password: 'Lukkehoday1',
	database: "game"
});*/


connection.connect(function(err)
{
	if(err){throw err}
})

module.exports = connection;