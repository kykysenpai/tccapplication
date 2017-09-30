//renvoie un object js avec les valeurs du form
function formToJson(name){
  var map = {};
  $('form[name=' + name + ']')
				.find(
						'input[type=text],input[type=email],input[type=password],select')
				.each(function() {
					map[$(this).attr('name')] = $(this).val();
				});
		return map;
}

function gererOutput(numero, texte){
	switch (numero){
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
      texte +=" : Wrong login/password combination !";
      break;
		default :
			texte = "Unknown Error !";
		}
	switch (numero){
	case 0:
  case 4:
		toastr["warning"](texte);
		break;
	case 1:
		toastr["success"](texte);
		break;
	case 2:
  case 3:
		toastr["error"](texte);
		break;
	case 5:
		toastr["info"](texte);
		break;
	}
}
