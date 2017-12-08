var isTyping = false;

$(function() {


	$('#chatForm').submit(function() {
		var dateNow = new Date();
		dateNow = {
			hour: dateNow.getHours(),
			minute: dateNow.getMinutes(),
			second: dateNow.getSeconds()
		};
		socket.emit('chatMessage', {
			date: dateNow,
			msg: $('#chatText').val()
		});
		socket.emit('stoppedTyping');
		isTyping = false;
		$('#chatMessages').append('<li class="list-group-item">[' +
			dateNow.hour + ':' +
			dateNow.minute + ':' +
			dateNow.second + '] Vous: ' + $('#chatText').val() + '</li>');
		$('#chatText').val(''); // vide l'input
		$('#scrollableChat').scrollTop($('#scrollableChat')[0].scrollHeight); //redescend le chat
		return false; //désactive le rechargement de la page au submit
	});

	$('#chatText').on('keypress', function() {
		if (!isTyping) {
			socket.emit('isTyping');
			isTyping = true;
		}
	});
	socket.on('isTyping', function(data) {
		$('#isTyping').append('<li class="list-group-item" name="' + data.id_user + '">' +
			data.user + ' is Typing</li>');
	});
	socket.on('stoppedTyping', function(data) {
		$('#isTyping li[name=' + data.id_user + ']').remove();
	});

	var connected_users;

	socket.on('chatMessage', function(msg) {
		$('#chatMessages').append('<li class="list-group-item">[' +
			msg.date.hour + ':' +
			msg.date.minute + ':' +
			msg.date.second + '] ' + msg.user + ': ' + msg.msg + '</li>');
		$('#scrollableChat').scrollTop($('#scrollableChat')[0].scrollHeight); //descend le chat
	});

	socket.on('current_users', function(data) {
		connected_users = data
		for (var id_user in connected_users) {
			$('#chatUsers').find('a').each(function() {
				if ($(this).attr('name') == id_user)
					$(this).addClass('active');
			});
		}
	});

	socket.on('connected_user', function(id_user) {
		$('#chatUsers').find('a').each(function() {
			if ($(this).attr('name') == id_user)
				$(this).addClass('active');
		});
	});

	socket.on('disconnected_user', function(id_user) {
		$('#chatUsers').find('a').each(function() {
			if ($(this).attr('name') == id_user)
				$(this).removeClass('active');
		});
	});

	$.ajax({
		url: '/post',
		type: 'POST',
		data: {
			action: 'loadChatUsers'
		},
		success: function(ret) {
			var ret = JSON.parse(ret);
			console.log(ret);
			gererOutput(ret.num, 'loading chat users');
			for (var user in ret.map) {
				$('#chatUsers').append('<a class="list-group-item" name="' + ret.map[user].id_user + '">' + ret.map[user].login + '</a>');
			}

			$('#chatUsers').find('a').each(function() {
				$(this).click(function() {
					var id_user = $(this).attr('name');
					loadPage('user', 'contentContainer', function() {
						loadChatUser(id_user);
					});
				});
			});
			socket.emit('current_users', null);
		},
		error: function(ret) {
			gererOutput(2, 'loading chat users');
		}
	});
});
