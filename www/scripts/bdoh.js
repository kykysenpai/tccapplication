var currentID = 0;

$(function() {
	$('#tableTimerMarketplaceButton').click(function() {
		var row = '<tr id=tableTimerMarketplaceRow_"' + ++currentID + '">';
		row += '<td name="nomItem">' + $('#tableTimerMarketplaceNomItem').val() + "</td>";
		row += '<td name="nombreMinutes">' + $('#tableTimerMarketplaceNombreMinutes').val() + "</td>";
		row += '<td><button class="tableTimerMarketPlaceButtonRemove" type="button">Supprimer</button></td>';
		row += "</tr>";
		$('#tableTimerMarketplace > tr:first').after(row);
		startTimer($('#tableTimerMarketplaceNombreMinutes').val() * 1000, currentID);
	})

	$('.tableTimerMarketPlaceButtonRemove').click(function() {
		$(this).closest('tr').remove();
	})

});

function startTimer(interval, id) {
	var x = setInterval(function() {
		interval -= 1000;
		$('#tableTimerMarketplaceRow_' + id + ' td[name="nombreMinutes"]').val(interval / 1000);
		if (interval <= 0) {

			clearInterval(x);
		}
	}, 1000);
}