
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
      gererOutput(ret.num, 'login');
      if(ret.num === 1){
        chargerSession(ret.map.user, ret.map.id_user);
      }
    },
    error: function(ret){
      gererOutput(2, 'login');
    }
  });
}

function formMainSignOut(){
  socket.disconnect();
  $.ajax({
    url: '/post',
    type: 'POST',
    data: {
      action: 'formMainSignOut'
    },
    success: function(ret){
      var ret = JSON.parse(ret);
      gererOutput(ret.num, 'logout');
      afficherNotLogged();
    },
    error: function(ret){
      gererOutput(2, 'logout');
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
        case 'formMainSignOut':
          formMainSignOut();
          break;
      }
    });
});
