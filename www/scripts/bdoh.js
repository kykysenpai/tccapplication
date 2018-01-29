var currentID = 0;

$(function() {
	$('#tableTimerMarketplaceButton').click(function() {
		var row = '<tr id=tableTimerMarketplaceRow_"' + ++currentID + '">';
		row += '<td name="nomItem">' + $('#tableTimerMarketplaceNomItem').val() + "</td>";
		row += '<td name="nombreMinutes">' + $('#tableTimerMarketplaceNombreMinutes').val() + "</td>";
		row += "<td>" + "</td>";
		row += "</tr>";
		$('#tableTimerMarketplace > tr:first').after(row);
		startTimer($('#tableTimerMarketplaceNombreMinutes').val() * 1000, currentID);
	})
});

function startTimer(interval, id) {
	var x = setInterval(function() {
		interval -= 1000;
		var localRow = $('#tableTimerMarketplaceRow_' + id);
		$('#tableTimerMarketplaceRow_' + id + ' > td[name="nombreMinutes"]').val(interval / 1000);
		if (interval <= 0) {
			//son
			localRow.remove();
			clearInterval(x);
		}
	}, 1000);
}