//on ready
$(function(){

  $('.toHide').hide();
  $('.admin').hide();

  $('#navbar').find('li').each(function(){
    $(this).click(function(){
      $('#navbar').find('li').each(function(){
        $(this).removeClass("active");
      });
      $(this).addClass("active");
    })
  });

});
