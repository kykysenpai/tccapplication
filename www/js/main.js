function chargerSession(user, id_user) {
	afficherLogged();
	$('#pWelcome').html('Welcome back ' + user + ' ! (<a id="navEditProfileButton" name="' + id_user + '"><em>Edit Profile</em></a>)');
	$('#navEditProfileButton').click(function() {
		var id_user = $(this).attr('name');
		loadPage('profile', 'contentContainer', function() {
			loadChatProfile(id_user);
		});
	});

	//charger socket
	socket = io();
	socket.emit('user', {
		user: user,
		id_user: id_user
	});

	loadPage('chat', 'chatContainer');

	//charger Infos
	$.ajax({
		url: '/loadSession',
		type: 'POST'
		success: function(ret) {
			var ret = JSON.parse(ret);
			gererOutput(ret.num, "Chargement Session");
		},
		error: function(ret) {
			gererOutput(2, "Chargement Session");
		}
	});
}


$(function() { //on ready

	toastr.options = {
		"closeButton": false,
		"debug": false,
		"newestOnTop": false,
		"progressBar": true,
		"positionClass": "toast-bottom-right",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}

	//active nav bar
	$('.navbarClickable').each(function() {
		$(this).click(function() {
			$('#navbar').find('li').each(function() {
				$(this).removeClass("active");
			});
			$(this).addClass("active");
			loadPage(($(this).attr('name')), 'contentContainer');
		})
	});

	loadPage('home', 'contentContainer');
	isLogged(function(data) {
		sessionStorage.setItem('current_user_id', data.map.id_user);
		sessionStorage.setItem('current_user', data.map.user);
		chargerSession(data.map.user, data.map.id_user);
	});

});
