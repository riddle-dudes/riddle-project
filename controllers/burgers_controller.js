var express = require('express');
var burger = require('../models/burger.js');

var router = express.Router();

router.get("/", function(req, res)
{
	burger.all(function(result)
	{
		var burgersDevoured = [];
		var readyToEatBurgers = [];

		for (var i=0; i<result.length; i++)
		{
			if (result[i].devoured === 0)
			{
				readyToEatBurgers.push(result[i]);
			}

			else
			{
				burgersDevoured.push(result[i]);
			}
		}

		console.log(readyToEatBurgers);

		res.render("index",
		{
			burgersToEat: readyToEatBurgers,
			burgersEaten: burgersDevoured
		});
	});
});

router.put('/update/:id', function(req, res)
{
	var id = req.body.id;
	burger.update(id, function(result)
	{
		res.send("");
	})
})

router.post('/addBurger', function(req, res)
{
	var name = req.body.burger;
	console.log(name);
	burger.insert(name, function(result)
	{
		res.send("");
	})
})

module.exports = router;