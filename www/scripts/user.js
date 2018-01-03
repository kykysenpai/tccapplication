function loadChatUser(id_user) {
	$.ajax({
		url: '/user',
		type: 'GET',
		data: 'id=' + id_user,
		success: function(ret) {
			var ret = JSON.parse(ret);
			gererOutput(ret.num, 'loading user info');
			var map = ret.map;
			$('#pageUser > h1[name=login]').text(map.login);
			$('#pageUser li[name=surname]').text('Nom de famille : ' + map.surname);
			$('#pageUser li[name=firstname]').text('Prenom : ' + map.firstname);
			$('#pageUser li[name=login]').text('Pseudo : ' + map.login);
			$('#pageUser li[name=email]').text('Email : ' + map.email);
		},
		error: function(ret) {
			gererOutput(2, 'loading user info');
		}
	});
}
