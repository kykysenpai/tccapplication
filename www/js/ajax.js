function isLogged(callback) {
	$.ajax({
		url: '/post',
		type: 'POST',
		data: {
			action: 'isLogged',
			cookieAuth: localStorage.getItem('cookieAuth') ? localStorage.getItem('cookieAuth') : null //si on a un cookie on l'envoie
		},
		success: function(ret) {
			var ret = JSON.parse(ret);
			console.log(ret);
			if (ret.num === 1) {
				callback(ret);
			} else {
				afficherNotLogged();
			}
		},
		error: function(ret) {
			gererOutput(2, "Status");
		}
	});
}
