var currentID = 0;

$(function() {
	$('#tableTimerMarketplaceButton').click(function() {
		var row = '<tr id=tableTimerMarketplaceRow_"' + ++currentID + '">';
		row += "<td>" + $('#tableTimerMarketplaceNomItem').val() + "</td>";
		row += "<td>" + $('#tableTimerMarketplaceNombreMinutes').val() + "</td>";
		row += "<td>" + "</td>";
		row += "</tr>";
		$('#tableTimerMarketplace > tr:first').after(row);
		startTimer($('#tableTimerMarketplaceNombreMinutes').val() * 1000, currentID);
	})
});

function startTimer(interval, id) {
	var x = setInterval(function() {
		interval -= 1000;
		if (interval <= 0) {
			//son
			console.log($('#tableTimerMarketplaceRow_' + id));
			console.log('delete');
			$('#tableTimerMarketplaceRow_' + id).remove();
			clearInterval(x);
		}
	}, 1000);
}