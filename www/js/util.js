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

var response = function($num, $map){
  var self = {};
  self.num = $num;
  self.map = $map;
  return JSON.stringify(self);
}

function gererOutput(numero, texte){
		switch (numero){
		case "0":
			texte += " : Failure !";
    case "1":
      texte += "Success !";
    case "3":
      texte += "No Authorization !";
		default :
			texte = "Unknown Error !";
		}
	switch (numero){
	case "0":
		toastr["warning"](texte);
		break;
	case "1":
		toastr["success"](texte);
		break;
	case "2":
  case "3":
		toastr["error"](texte);
		break;
	case "5":
		toastr["info"](texte);
		break;
	}
}
