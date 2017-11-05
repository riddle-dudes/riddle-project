var token = sessionStorage.getItem("token")
var attacking = false;
var userId = 0;

$.ajax(
{
	url: '/leaderboard/populate',
	type: 'get',
}).then(function(result)
{
	console.log(result)

	for (var j=0; j<result.length; j++)
	{
		if (token === result[j].token)
		{
			userId = result[j].id
			if (result[j].attacking === 0)
			{
				attacking = false;
			}

			else
			{
				attacking = true;
			}
		}
	}

	for (var i=0; i<result.length; i++)
	{
		if (token === result[i].token)
		{
			var tr = $('<tr class="you">');
			var td1 = $('<td>'+result[i].rank+'</td>')
			var td2 = $('<td>'+result[i].name+'</td>')
			var td3 = $('<td>'+result[i].level+'</td>')
			var td4 = $('<td><i class="fa fa-usd" aria-hidden="true"></i> '+result[i].coins+'</td>')
			var td5 = $('<td></td>')

			if (!attacking)
			{
				console.log("USER IS NOT ATTACKING!")
			}			

			else
			{
				console.log("USER IS ALREADY ATTACKING!")
			}
		}

		else
		{
			var tr = $('<tr>');
			var td1 = $('<td>'+result[i].rank+'</td>')
			var td2 = $('<td>'+result[i].name+'</td>')
			var td3 = $('<td>'+result[i].level+'</td>')
			var td4 = $('<td><i class="fa fa-usd" aria-hidden="true"></i> '+result[i].coins+'</td>')

			if (!attacking)
			{
				var td5 = $('<td><button type="button" class="btn btn-danger attack" id="'+result[i].id+'">Attack!</button></td>')
			}

			else
			{
				var td5 = $("<td>You're already attacking</td>")

			}
		}

		tr.append(td1)
		tr.append(td2)
		tr.append(td3)
		tr.append(td4)
		tr.append(td5)

		$('tbody').append(tr)
	}
})

$(document).on("click", ".attack", function(event)
{
	console.log($(this).attr("id"))

	var data = 
	{
		attackerId: userId,
		defenderId: $(this).attr("id")
	}

	$.ajax(
	{
		url: "/attack",
		type: "post",
		data: data
	}).then(function(result)
	{
		console.log(result);
		window.location.reload();
	})
})