var token = sessionStorage.getItem("token")

if (token === null)
{
	window.location = "/"
}

else
{
	$.ajax(
	{
		url: '/leaderboard/populate',
		type: 'get',
	}).then(function(result)
	{
		console.log(result)

		for (var i=0; i<result.length; i++)
		{

			if (token === result[i].token)
			{
				var tr = $('<tr class="you">');
				var td1 = $('<td>'+result[i].rank+'</td>')
				var td2 = $('<td>'+result[i].name+'</td>')
				var td3 = $('<td>'+result[i].level+'</td>')
				var td4 = $('<td><i class="fa fa-usd" aria-hidden="true"></i> '+result[i].coins+'</td>')			
			}

			else
			{
				var tr = $('<tr>');
				var td1 = $('<td>'+result[i].rank+'</td>')
				var td2 = $('<td>'+result[i].name+'</td>')
				var td3 = $('<td>'+result[i].level+'</td>')
				var td4 = $('<td><i class="fa fa-usd" aria-hidden="true"></i> '+result[i].coins+'</td>')			
			}

			tr.append(td1)
			tr.append(td2)
			tr.append(td3)
			tr.append(td4)

			$('tbody').append(tr)
		}
	})
}