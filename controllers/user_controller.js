var express = require('express');
var burger = require('../models/burger.js');
var aesjs = require('aes-js');

var router = express.Router();

router.get("/", function(req, res)
{
	res.render("index");
});

router.post('/register', function(req, res)
{
	var password = req.body.password
	var textBytes = aesjs.utils.utf8.toBytes(password);
	var encryptedHex = aesjs.utils.hex.fromBytes(textBytes);
	console.log(encryptedHex);

	var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
	var decryptedText = aesjs.utils.utf8.fromBytes(encryptedBytes);
	console.log(decryptedText);
})


module.exports = router;