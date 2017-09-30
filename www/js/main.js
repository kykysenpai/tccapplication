function chargerSession(user){
  afficherLogged();
  $('#pWelcome').text("Welcome back " + user + " !");

  //charger socket
  socket = io();

  //charger Infos
  $.ajax({
    url:'/post',
    type:'POST',
    data:{action:'chargerSession'},
    success: function(ret){
      var ret = JSON.parse(ret);
      gererOutput(ret.num, "Charement Session");
    },
    error: function(ret){
      gererOutput(2, "Chargement Session");
    }
  });
}

//on ready
$(function(){

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
  $('#navbar').find('li').each(function(){
    $(this).click(function(){
      $('#navbar').find('li').each(function(){
        $(this).removeClass("active");
      });
      $(this).addClass("active");
    })
  });

  $.ajax({
    url: '/post',
    type: 'POST',
    data: {action: 'isLogged'},
    success: function(ret){
      var ret = JSON.parse(ret);
      if(ret.num === 1){
        chargerSession(ret.map.user);
      } else {
        afficherNotLogged();
      }
    },
    error: function(ret){
      gererOutput(2, "Status");
    }
  });

});
