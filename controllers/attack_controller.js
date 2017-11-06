var express = require('express');
var attackModel = require('../models/attack-model.js');

var router = express.Router();

setInterval(function()
{ 
	attackModel.getTimes(function(result)
	{
		for (var i=0; i<result.length; i++)
		{
			var time = Math.floor(10 - (Date.now() - result[i].time.getTime())/(60*1000)+1)
			var time2 = 60 - (Date.now() - result[i].time.getTime())/(60*1000)
			console.log(time2+" -> "+time)

			if (time < 0)
			{
				console.log("Out of time!")
			}
		}
	})
}, 1000);

module.exports = router;