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
		case "0":
			texte += " : Failure !";
    case "1":
      texte += "Success !";
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
		toastr["error"](texte);
		break;
	case "5":
		toastr["info"](texte);
		break;
	}
