function loadChatProfile(id_user) {
	$.ajax({
		url: '/user',
		type: 'GET',
		data: 'id=' + id_user,
		success: function(ret) {
			var ret = JSON.parse(ret);
			gererOutput(ret.num, 'loading profile info');
			var map = ret.map;
			$('#pageProfile > h1[name=login]').text(map.login);
			$('#pageProfile li[name=surname] > p').text(map.surname);
			$('#pageProfile li[name=firstname] > p').text(map.firstname);
			$('#pageProfile li[name=login] > p').text(map.login);
			$('#pageProfile li[name=email] > p').text(map.email);

			$('#pageProfile li[name=surname] input').val(map.surname);
			$('#pageProfile li[name=firstname] input').val(map.firstname);
			$('#pageProfile li[name=login] input').val(map.login);
			$('#pageProfile li[name=email] input').val(map.email)

			$('#pageProfile button').click(function() {
				toggleClassProfile();
			});

			$('#pageProfile button[name=confirmer]').click(function() {
				var map = formToJson($(this).closest('form').attr('name'));
				$.ajax({
					url: '/modifProfil',
					type: 'POST',
					data: map,
					success: function(ret) {
						var ret = JSON.parse(ret);
						gererOutput(ret.num, 'Profile modification');
					},
					error: function(ret) {
						gererOutput(2, 'Profile modification');
					}
				});
			});
		},
		error: function(ret) {
			gererOutput(2, 'loading user info');
		}
	});
}

function toggleClassProfile() {
	$('#pageProfile p').each(function() { //toggle les valeurs
		$(this).toggleClass('hidden');
	});
	$('#pageProfile input').each(function() { //toggle les inputs
		$(this).toggleClass('hidden');
	});
	$('#pageProfile button').each(function() { //toggle les buttons
		$(this).toggleClass('hidden');
	});
}
