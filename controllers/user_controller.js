var express = require('express');
var usersModel = require('../models/users-model.js');
var riddlesModel = require('../models/riddles-model.js');
var aesjs = require('aes-js');
var validator = require('validator');

var router = express.Router();

var createToken = function()
{
	var inputs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	var token = "";

	for (var i=0; i<10; i++)
	{
		var r = Math.floor(Math.random()*(inputs.length-1));
		token = token + inputs[r];
	}

	return token;
}

router.get("/", function(req, res)
{
	res.render("index");
});

router.get("/hub/:token?", function(req, res) {
	var chosen = req.params.token;
	if (chosen) {
		console.log(chosen);
	}
	res.render("hub");
});


router.post('/register', function(req, res)
{
	usersModel.getEmail(req.body.email, function(result)
	{
		console.log("getEmail call...")

		if (result.length > 0)
		{
			console.log("getEmail call...")
			console.log(result.length)
			res.send("emailError");
			return;			
		}

		if (req.body.name !== "" && validator.isEmail(req.body.email) && req.body.password !== "")
		{
			var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

			var password = req.body.password;
			var textBytes = aesjs.utils.utf8.toBytes(password);

			var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
			var encryptedBytes = aesCtr.encrypt(textBytes);

			var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
			var token = createToken();

			console.log(encryptedHex);

			usersModel.createUser(req.body.name, req.body.email, encryptedHex, token, function(result)
			{
				res.send("created")
			})		
		}

		else if (!validator.isEmail(req.body.email))
		{
			res.send("invalidEmail")
		}

		else
		{
			res.send("tryAgain")
		}
	});

})

router.post("/login", function(req, res)
{
	console.log(req.body.email+" "+req.body.password)

	var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
	var textBytes = aesjs.utils.utf8.toBytes(req.body.password);
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	var encryptedBytes = aesCtr.encrypt(textBytes);
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

	usersModel.getUser(req.body.email, encryptedHex, function(result)
	{
		console.log(result)
		if (result[0] === undefined)
		{
			res.send("THERE WAS A HUGE ERROR!")
			return;
		}

		else
		{
			var token = createToken();
			console.log("id "+result[0].id)
			console.log("New token "+token)
			usersModel.updateToken(result[0].id, token, function(result)
			{
				res.send(token)
				return;
			})
		}
	})
})

router.get("/hublogin", function(req, res)
{
	res.render("hub");
})

var testOnLoad = function()
{
	var req = 
	{
		token: "gFjehAhYiK",
	}

	var coins = 0;
	var level = 0;
	var riddle = "";
	var riddleId = "";

	usersModel.findFromToken(req.token, function(user)
	{
		coins = user[0].coins;
		level = user[0].level;

		riddlesModel.getRiddlesWithLevelNotSeen(user[0].id, level, function(result)
		{
			var r = Math.floor(Math.random() * (result.length))
			console.log(result)
			console.log(result[r])
			riddle = result[r].text
			riddleId = result[r].id
			console.log(riddle)
			console.log(riddleId)
		})

		//Send this object back to the user
		var data = 
		{
			coins: coins,
			level: level,
			riddle: riddle,
			riddleId: riddleId
		}
	})
}

var testSubmit = function()
{
	var req = 
	{
		token: "gFjehAhYiK",
		riddleId: 2,
		input: "dog"
	}

	var correct = false;
	var coins = 0;
	var level = 0;
	var riddle = "";
	var riddleId = "";

	usersModel.findFromToken(req.token, function(user)
	{
		console.log(user)
		level = user[0].level

		riddlesModel.findFromId(req.riddleId, function(result)
		{


			//Seeing if answer is correct or not
			if (req.input.toLowerCase().trim() === result[0].answer.toLowerCase().trim())
			{
				console.log("User got it right!")
				console.log("User started with "+user[0].coins)
				coins = user[0].coins + 100*Math.pow(2, user[0].level-1)/5;
				console.log("Now user has "+coins)
				correct = true;
				riddlesModel.addRiddleCorrect(user[0].id, req.riddleId, function(result){})

				if (coins >= 100*Math.pow(2, user[0].level))
				{
					level = user[0].level+1
					console.log("User level uped and is now level "+level)
				}
			}

			else
			{
				console.log("User got it wrong!")
				console.log("User started with "+user[0].coins)
				coins = user[0].coins - 100*Math.pow(2, user[0].level-1)/5;
				console.log("Now user has "+coins)

				if (coins < 100*Math.pow(2, user[0].level-1) && user[0].level>1)
				{
					level = user[0].level-1
					console.log("User downgraded in level and is now level "+level)
				}
			}

			usersModel.updateUser(user[0].id, coins, level, function(result)
			{
				//Sending 'correct' to client
				//res.send(correct)
			})
/*
			//Finding a new Riddle
			riddlesModel.getRiddlesWithLevelNotSeen(user[0].id, level, function(result)
			{
				var r = Math.floor(Math.random() * (result.length))
				console.log(result)
				console.log(result[r])
				riddle = result[r].text
				riddleId = result[r].id
				console.log(riddle)
				console.log(riddleId)
			})

			//Send this object back to the user
			var data = 
			{
				correct: correct,
				coins: coins,
				level: level,
				riddle: riddle,
				riddleId: riddleId
			}*/
		})
	})
}

testSubmit()


module.exports = router;