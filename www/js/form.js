
function formMainSignIn(map){
  $.ajax({
    url: '/post',
    type: 'POST',
    data: {
      action: 'formMainSignIn',
      map: map
    },
    success: function(ret){
      var ret = JSON.parse(ret);
      console.log(ret);
      gererOutput(ret, 'login');
    },
    error: function(ret){
      gererOutput(0, 'login');
    }
  });
}

$(function(){
    $('.formButton').click(function(){
      var formName = $(this).closest('form').attr('name');
      var map = formToJson(formName);

      console.log(map);

      switch(formName){
        case 'formMainSignIn':
          formMainSignIn(map);
          break;
      }
    });
});
