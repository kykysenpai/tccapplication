function chargerSession(user){
  $('.notLogged').hide();
  $('#pWelcome').text("Welcome back " + user + " !");
  $('.logged').show();
  //charger Infos
}

//on ready
$(function(){

  $('.logged').hide();


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
      }
    },
    error: function(ret){
      gererOutput(2, "Status");
    }
  });

});
