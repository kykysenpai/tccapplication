const views = './../views/'; //dossier ou se trouvent les fichiers html partiels
const scripts = './../scripts/'; //dossier contenant les scripts js

var socket;

function loadPage(name, where, callback) {
	$.ajax({
		url: '/post',
		type: 'POST',
		data: {
			action: 'loadPage',
			page: name
		},
		success: function(ret) {
			try {
				var ret = JSON.parse(ret);
				gererOutput(ret.num, 'page loading');
			} catch (e) {
				$('#' + where).html(ret);
				$.getScript(scripts + name + ".js", callback); //callback appelé quand script chargé
			}
		},
		error: function(ret) {
			gererOutput(2, 'page loading');
		}
	});
}

function afficherLogged() {
	$('.notLogged').addClass('hidden');
	$('.logged').removeClass('hidden');
}

function afficherNotLogged() {
	$('.logged').addClass('hidden');
	$('.notLogged').removeClass('hidden');
}

//renvoie un object js avec les valeurs du form
function formToJson(name) {
	var map = {};
	$('form[name=' + name + ']')
		.find(
			'input[type=text],input[type=email],input[type=password],select')
		.each(function() {
			map[$(this).attr('name')] = $(this).val();
		});
	return map;
}

function gererOutput(numero, texte) {
	switch (numero) {
		case 0:
			texte += " : Failure !";
			break;
		case 1:
			texte += " : Success !";
			break;
		case 2:
			texte += " : Error Server, contact Kyky !";
			break;
		case 3:
			texte += " : No Authorization !";
			break;
		case 4:
			texte += " : Wrong login/password combination !";
			break;
		case 5:
			texte += " : Couldn't find user !";
			break;
		case 6:
			texte += " : Passwords didn't match !";
			break;
		default:
			texte = "Unknown Error !";
	}
	switch (numero) {
		case 0:
		case 4:
		case 6:
			toastr["warning"](texte);
			break;
		case 1:
			toastr["success"](texte);
			break;
		case 2:
		case 3:
			toastr["error"](texte);
			loadPage('notLoggedIn', 'contentContainer');
			break;
		case 5:
			toastr["info"](texte);
			break;
	}
}