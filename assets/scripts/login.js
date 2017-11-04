$('#register').on("submit", function(event)
{
	$('#login-error').hide()
	$('#register-error').hide()
	event.preventDefault();

	var name = $('#register-name').val().trim()
	var email = $('#register-email').val().toLowerCase().trim()
	var password = $('#register-password').val().trim()

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
			$('#register-error').show()
			$('#register-error').html("We already have this email in our system.")
		}

		else if (result === "error")
		{
			$('#register-error').show()
			$('#register-error').html("There was an error.  Try again!")
		}

		else if (result === "invalidEmail")
		{
			console.log("HI!")
			$('#register-error').show()
			$('#register-error').html("We don't recognize this as an email.")
		}

		else
		{
			sessionStorage.setItem("token", result.token);
			//window.location = '/hublogin'
		}
	})
})

$('#login').on("submit", function(event)
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

		else
		{
			sessionStorage.setItem("token", result);
/*			$.ajax(
			{
				url: "/hublogin",
				tyle: "get"
			})*/

			window.location = '/hublogin'
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