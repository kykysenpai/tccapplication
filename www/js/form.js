function formMainSignIn(map) {
	$.ajax({
		url: '/post',
		type: 'POST',
		data: {
			action: 'formMainSignIn',
			map: map
		},
		success: function(ret) {
			var ret = JSON.parse(ret);
			gererOutput(ret.num, 'login');
			if (ret.num === 1) {
				sessionStorage.setItem('current_user_id', ret.map.id_user);
				sessionStorage.setItem('current_user', ret.map.user);
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
		url: '/post',
		type: 'POST',
		data: {
			action: 'formMainSignOut'
		},
		success: function(ret) {
			var ret = JSON.parse(ret);
			gererOutput(ret.num, 'logout');
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
