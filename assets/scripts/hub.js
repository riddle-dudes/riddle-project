var riddleId = 0;
var token = sessionStorage.getItem("token")
console.log(token)

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
})


$("#answer").on("click", function(event) {

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
		console.log(result)
	})

	window.location.reload();

})
/*$('#login').on("submit", function(event)
{
	$('#login-error').hide()
	$('#register-error').hide()
	event.preventDefault();

	var email = $('#login-email').val().toLowerCase().trim()
	var password = $('#login-password').val().trim()
	console.log(email+" "+password)

	var data = 
	{
		email: email,
		password: password
	}

	$.ajax(
	{
		url:'/login',
		type: 'post',
		data: data
	}).then(function(result)
	{
		if (result === "THERE WAS A HUGE ERROR!")
		{
			$('#login-error').show()
			$('#login-error').html("Email and password do not match.")
		}
		sessionStorage.setItem("token", result);
	})

})*/