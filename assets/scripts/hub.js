var riddleId = 0;
var token = sessionStorage.getItem("token")

if (token === null)
{
	window.location = "/login"
}
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

$.ajax(
{
	url: '/getinfo',
	type: 'post',
	data: data
}).then(function(result)
{

	console.log(result)
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
		$('#percent').html(result.percent+"%")
	}
})


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