var express = require('express');
var usersModel = require('../models/users-model.js');
var riddlesModel = require('../models/riddles-model.js');
var attackModel = require('../models/attack-model.js');
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

router.get("/leaderboard", function(req, res)
{
	res.render("leaderboard")
})

router.get("/leaderboard/populate", function(req, res)
{
	usersModel.populateTable(function(result)
	{
		var users = []

		for (var i=0; i<result.length; i++)
		{
			var user = result[i]
			user.rank = i+1
			users.push(user)
		}
		res.send(users)
	});
})

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

		else if (req.body.name !== "" && validator.isEmail(req.body.email) && req.body.password !== "")
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
				res.send(
				{
					result: "created",
					token: token
				})
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


router.post("/getinfo", function(req, res)
{
	var name = "";
	var coins = 0;
	var level = 0;
	var riddle = "";
	var riddleId = 0;

	usersModel.findFromToken(req.body.token, function(user)
	{
		coins = user[0].coins;
		level = user[0].level;
		name = user[0].name;

		riddlesModel.getRiddlesWithLevelNotSeen(user[0].id, level, function(result)
		{
			console.log(result)
			var r = Math.floor(Math.random() * (result.length))
			riddle = result[r].text
			riddleId = result[r].id
			var percent = result[r].correct/(result[r].correct + result[r].wrong)*100
			console.log(riddle)
			console.log(riddleId)
			
			//Send this object back to the user
			var data = 
			{
				name: name,
				coins: coins,
				level: level,
				riddle: riddle,
				riddleId: riddleId,
				percent: percent
			}

			res.send(data)
		})
	})
})

router.post("/submit", function(req, res)
{
	var correct = false;

	usersModel.findFromToken(req.body.token, function(user)
	{
		console.log(user)
		level = user[0].level

		riddlesModel.findFromId(req.body.riddleId, function(result)
		{
			if (req.body.input.toLowerCase().trim() === result[0].answer.toLowerCase().trim())
			{
				coins = user[0].coins + 100*Math.pow(2, user[0].level-1)/5;
				correct = true;
				riddlesModel.addRiddleCorrect(user[0].id, req.body.riddleId, function(result){})
				riddlesModel.updateRiddlePercent(req.body.riddleId, "correct", function(result){})

				if (coins >= 100*Math.pow(2, user[0].level))
				{
					level = user[0].level+1
				}
			}

			else
			{
				coins = user[0].coins - 100*Math.pow(2, user[0].level-1)/5;
				riddlesModel.updateRiddlePercent(req.body.riddleId, "wrong", function(result){})

				if (coins < 100*Math.pow(2, user[0].level-1) && user[0].level>1)
				{
					level = user[0].level-1
				}
			}

			usersModel.updateUser(user[0].id, coins, level, function(result)
			{
				res.send(correct)
			})
		})
	})
})

router.post("/attack", function(req, res)
{
	console.log(req.body)
	attackModel.attack(req.body.attackerId, req.body.defenderId, function(result)
	{
		usersModel.attacking(req.body.attackerId, true, function(result){})
		res.send("Attacking!")
	})
})

module.exports = router;