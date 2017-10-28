$(document).on("click", ".devour", function(event)
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
})