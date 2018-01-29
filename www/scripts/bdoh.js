var currentID = 0;

$(function() {
	$('#tableTimerMarketplaceButton').click(function() {
		var row = '<tr name=tableTimerMarketplaceRow_' + (++currentID) + '>';
		row += '<td name="nomItem">' + $('#tableTimerMarketplaceNomItem').val() + "</td>";
		row += '<td name="nombreMinutes">' + $('#tableTimerMarketplaceNombreMinutes').val() + "</td>";
		row += '<td><button class="tableTimerMarketPlaceButtonRemove" type="button">Supprimer</button></td>';
		row += "</tr>";
		$('#tableTimerMarketplace > tr:first').after(row);
		startTimerMarketPlace($('#tableTimerMarketplaceNombreMinutes').val() * 1000, currentID);
		$('#tableTimerMarketplaceRow_' + currentID + ' button').click(function() {
			$(this).closest('tr').remove();
		})
	});

	$('.tableTimerMarketPlaceButtonRemove').click(function() {
		$(this).parent().parent().remove();
	});

});

function startTimerMarketPlace(interval, id) {
	var x = setInterval(function() {
		interval -= 1000;
		$('#tableTimerMarketplace tr[name="tableTimerMarketplaceRow_' + id + '"] td[name="nombreMinutes"]').text(interval / 1000);
		if (interval <= 0) {

			clearInterval(x);
		}
	}, 1000);
}