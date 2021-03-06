var riddleId = 0;
var token = sessionStorage.getItem("token")

console.log(token)
var freeze = false

var correctDisplay = function()
{
	$('.jumbotron').css("background", "#0ccc00")
}

var wrongDisplay = function()
{
	$('.jumbotron').css("background", "red")
}

var data = 
{
	token: token
}

if (token === null)
{
	window.location = "/"
}

else
{
	$.ajax(
	{
		url: '/getinfo',
		type: 'post',
		data: data
	}).then(function(result)
	{
		if (result === "nouser")
		{
			window.location="/"
		}

		else if (result.riddle === "noriddles")
		{
			$('#riddle').html("Oh no!  We're out of riddles for you!")
			$('#name').html(result.name)
			$('#coins').html(result.coins)
			$('#level').html(result.level)
			$('#answer').hide()
		}

		else
		{
			var percent = Math.round(result.percent)
			riddleId = result.riddleId
			$('#name').html(result.name)
			$('#coins').html(result.coins)
			$('#level').html(result.level)
			$('#riddle').html(result.riddle)

			if (result.percent === null)
			{
				$('#percent-container').html("<h5>You're the first to try this riddle!</h5>")
			}

			else
			{
				$('#percent').html(percent+"%")
			}
		}

	})
}



$("#answer").on("click", function(event)
{
	if (!freeze)
	{
		freeze = true;
		var answer = $("#submit-answer").val().toLowerCase().trim();
		console.log(answer)

		var data = 
		{
			input: answer,
			token: token,
			riddleId: riddleId
		}

		$.ajax(
		{
			url: "/submit",
			type: "post",
			data: data
		}).then(function(result)
		{
			if (result)
			{
				$('#riddle').hide()
				$('#correct').show()
				correctDisplay()
			}

			else
			{
				$('#riddle').hide()
				$('#wrong').show()
				wrongDisplay()			
			}

			setTimeout(function()
			{
				window.location.reload();
			}, 2000)
		})
	}
})