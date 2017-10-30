$('#register').on("submit", function(event)
{
	event.preventDefault();

	var name = $('#register-name').val().trim()
	var email = $('#register-email').val().toLowerCase().trim()
	var password = $('#register-password').val().trim()

	console.log(name)
	console.log(email)
	console.log(password)

	var data = 
	{
		name: name,
		email: email,
		password: password
	}

	$.ajax(
	{
		url: '/register',
		type: 'post',
		data: data
	}).then(function(result)
	{
		console.log(result)
		if (result === "emailError")
		{
			console.log("We already have this email in our system.")
		}

		if (result === "error")
		{
			console.log("There was an error!")
		}
	})
})





/*$(document).on("click", ".devour", function(event)
{
	var ID = $(this).attr("id");
	console.log(ID)
	var id =
	{
		id: ID
	};

	$.ajax(
	{
		url: '/update/'+id,
		data: id,
		type: 'put'
	}).done(function(result)
	{
		window.location.reload()
	});
});

$('#submit').on('click', function(event)
{
	var newBurger = $('#newBurger').val();
	var addBurger =
	{
		burger: newBurger
	}

	$.ajax(
	{
		url: '/addBurger',
		data: addBurger,
		type: 'post'
	}).done(function(event)
	{
		window.location.reload()
	})
})*/