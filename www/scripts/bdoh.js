var currentID = 0;

$(function() {
	$('#tableTimerMarketplaceButton').click(function() {
		var row = '<tr name=tableTimerMarketplaceRow_' + (++currentID) + '>';
		row += '<td name="nomItem">' + $('#tableTimerMarketplaceNomItem').val() + "</td>";
		row += '<td name="nombreMinutes">' + $('#tableTimerMarketplaceNombreMinutes').val() + "</td>";
		row += '<td><button class="tableTimerMarketPlaceButtonRemove btn" type="button">Supprimer</button></td>';
		row += "</tr>";
		$('#tableTimerMarketplace').append(row);
		startTimerMarketPlace($('#tableTimerMarketplaceNombreMinutes').val() * 60 * 1000, currentID);
		$('#tableTimerMarketplace > tr:last > td:last > button').click(function() {
			$(this).closest('tr').remove();
		})
	});
});

function startTimerMarketPlace(interval, id) {
	var x = setInterval(function() {
		interval -= 1000;
		min = (interval / 1000) % 60;
		sec = interval - (min * 60);
		$('#tableTimerMarketplace tr[name="tableTimerMarketplaceRow_' + id + '"] td[name="nombreMinutes"]').text(min + ':' + sec);
		if (interval <= 0) {

			clearInterval(x);
		}
	}, 1000);
}