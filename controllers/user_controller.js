var express = require('express');
var usersModel = require('../models/users-model.js');
var aesjs = require('aes-js');
var validator = require('validator');

var router = express.Router();

router.get("/", function(req, res)
{
	res.render("index");
});


router.post('/register', function(req, res)
{
	if (req.body.password !== "" && validator.isEmail(req.body.email) && req.body.password !== "")
	{
		var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

		var password = req.body.password;
		var textBytes = aesjs.utils.utf8.toBytes(password);

		var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
		var encryptedBytes = aesCtr.encrypt(textBytes);

		var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

		console.log(encryptedHex);

		usersModel.createUser(req.body.name, req.body.email, encryptedHex, function(result)
		{
			res.send("created")
		})


		//Needed to see what the password was!
/*		var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
		var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
		var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
		var decryptedBytes = aesCtr.decrypt(encryptedBytes); 
		var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
		console.log("What the password was!")
		console.log(decryptedText);*/
	}

	else
	{
		res.send("error")
	}
})


module.exports = router;