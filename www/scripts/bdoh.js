$(function() {
	$('#tableTimerMarketplaceButton').click(function() {
		var row = "<tr>";
		row += "<td>" + $('#tableTimerMarketplace > input[name="nomItem"]').val() + "</td>";
		row += "<td>" + $('#tableTimerMarketplace > input[name="nombreMinutes"]').val() + "</td>";
		row += "<td>" + "</td>";
		row += "</tr>";
		console.log(row);
		$('#tableTimerMarketplace > tr:first').after(row);
	})
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