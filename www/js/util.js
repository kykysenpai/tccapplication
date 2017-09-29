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
