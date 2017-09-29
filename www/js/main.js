//on ready
$(function(){

  $('.toHide').hide();
  $('.admin').hide();

  $('nav').find('li').each(function(){
    $(this).click(function(){
      $('nav').find('li').each(function(){
        $(this).removeClass("active");
      });
      $(this).addClass("active");
    })
  });

});
