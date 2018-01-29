var currentID = 0;

$(function() {
	$('#tableTimerMarketplaceButton').click(function() {
		var row = '<tr id=tableTimerMarketplaceRow_"' + ++currentID + '">';
		row += "<td>" + $('#tableTimerMarketplaceNomItem').val() + "</td>";
		row += "<td>" + $('#tableTimerMarketplaceNombreMinutes').val() + "</td>";
		row += "<td>" + "</td>";
		row += "</tr>";
		$('#tableTimerMarketplace > tr:first').after(row);
		startTimer($('#tableTimerMarketplaceNombreMinutes').val() * 60 * 1000);
	})
});

function startTimer(interval) {
	var x = setInterval(function() {
		interval -= 1000;
		localID = currentID;
		if (interval <= 0) {
			//son
			$('#tableTimerMarketplaceRow_' + localID).remove();
			clearInterval(x);
		}
	}, 1000);
}