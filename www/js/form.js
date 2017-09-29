$(function(){
    //main login in app
    $('#mainModalButton').click(function(){
      var map = formToJson("mainModalLogin");
      $.ajax({
        url : '/post',
        type : 'POST',
        data : {action:'mainLogin', valeurs:map},
        success : function(){
            console.log("success login");
        },
        error : function(){
          console.log("error login");
        }
      });
      //fin ajax
    });
    //fin click mainModalButton
});
