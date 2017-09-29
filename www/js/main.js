//on ready
$(function(){

  $('.toHide').hide();
  $('.admin').hide();

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
    data: {action:"action"},
    success: function(resp){
      console.log("ok");
    },
    error: function(resp){
      console.log("ko");
    }
  });

});
