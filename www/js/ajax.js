function isLogged(callback) {
	$.ajax({
		url: '/post',
		type: 'POST',
		data: {
			action: 'isLogged'
		},
		success: function(ret) {
			var ret = JSON.parse(ret);
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
