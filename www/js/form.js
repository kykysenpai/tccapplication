function formMainSignIn(map) {
	$.ajax({
		url: '/signIn',
		type: 'POST',
		data: {
			map: map
		},
		success: function(ret) {
			var ret = JSON.parse(ret);
			gererOutput(ret.num, 'login');
			if (ret.num === 1) {
				sessionStorage.setItem('current_user_id', ret.map.id_user);
				sessionStorage.setItem('current_user', ret.map.user);
				if (ret.map.cookieAuth) {
					localStorage.setItem('cookieAuth', ret.map.cookieAuth);
				}
				chargerSession(ret.map.user, ret.map.id_user);
			}
		},
		error: function(ret) {
			gererOutput(2, 'login');
		}
	});
}

function formMainSignOut() {
	socket.disconnect();
	$.ajax({
		url: '/signOut',
		type: 'POST',
		success: function(ret) {
			var ret = JSON.parse(ret);
			gererOutput(ret.num, 'logout');
			localStorage.removeItem('cookieAuth');
			afficherNotLogged();
		},
		error: function(ret) {
			gererOutput(2, 'logout');
		}
	});
}

$(function() {
	$('form[name=formMainSignIn]').submit(function() {
		var map = formToJson('formMainSignIn');
		formMainSignIn(map);
		return false;
	});
	$('form[name=formMainSignOut] > button').click(function() {
		formMainSignOut();
	});
});
