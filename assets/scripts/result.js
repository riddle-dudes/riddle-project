var riddle = "this is, the end, for you my friend"

var fakedata = {
	name: 1,
	coins: 20,
	level: 2,
	riddle: riddle,
	riddleId: 3
};

var coins = 50;

$(".profile-coins").text(fakedata.coins);
$(".profile-name").text(fakedata.name);
$(".profile-level").text(fakedata.level);
$(".riddle-id").text(fakedata.riddleId);
$("#riddle").text(fakedata.riddle);



	// function result() {
		
	// 	$.ajax( {
	// 		url: "/hub",
	// 		method: "POST",
	// 		data: sessionstorage.getItem("token")
	// 	}).then(
	// 		console.log(
	// 			data.coins,
	// 			data.level,
	// 			data.riddle,
	// 			data.riddleId
	// 			)
	// 	)};
	
	// function winner(res) {

	// 	 (data.correct) ? alert("Winner") : alert("loser")
		
	// }
	// result()
