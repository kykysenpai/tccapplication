$(function(){
    $('.formButton').click(function(){
      var map = formToJson($(this).closest('form').attr('name'));
      console.log(map);
    });
});
