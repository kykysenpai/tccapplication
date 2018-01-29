$(function() {
	startTimer(5000);
});

function startTimer(interval) {
	var x = setInterval(function() {
		interval -= 1000;
		if (interval <= 0) {
			console.log("timeout");
			clearInterval(x);
		}
	}, 1000);
}