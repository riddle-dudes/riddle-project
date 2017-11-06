var express = require('express');
var attackModel = require('../models/attack-model.js');
var usersModel = require('../models/users-model.js');

var router = express.Router();

setInterval(function()
{ 
	attackModel.getTimes(function(result)
	{
		for (var i=0; i<result.length; i++)
		{
			var attack = result[i]
			var time = Math.floor(4 - (Date.now() - result[i].time.getTime())/(60*1000)+1)
			console.log("Attack: "+result[i].id+" Time Left: "+time)

			if (time < 1)
			{
				attackModel.getAttacker(result[i].id, function(result1)
				{
					var attacker = result1[0].attacker

					attackModel.getDefender(attack.id, function(result2)
					{
						var defender = result2[0].defender

						usersModel.findFromId(attacker, function(attacker)
						{
							usersModel.findFromId(defender, function(defender)
							{
								console.log(attacker)

								var attackerCoins = attacker[0].coins + defender[0].coins/2
								var defenderCoins = defender[0].coins/2

								console.log(attackerCoins)
								console.log(defenderCoins)

								usersModel.updateCoinsFromAttack(attacker[0].id, defender[0].id, attackerCoins, defenderCoins, function(result)
								{
									attackModel.deleteAttack(attack.id, function(result)
									{
										usersModel.attacking(attacker[0].id, false, function(result){})
									})
								})
							})
						})
					})
				})
			}
		}
	})
}, 1000);

module.exports = router;