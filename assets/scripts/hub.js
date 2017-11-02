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
})






$("#answer").on("click", function(event) {

var answer = $("#submit-answer").val().toLowerCase().trim();
console.log(answer);

var riddleId = 1;



var hubData = {
	input: answer,
	token: sessionStorage.getItem("token"),
	riddleId: riddleId
}

console.log(hubData)
	$.ajax({
		url: "/submit",
		type: "post",
		data: hubData
	}).then(function(result) {

	})

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