//on ready
$(function(){

  $('.toHide').hide();
  $('.admin').hide();

  // ouverture du modal
  $('#mainNavConnexion').click(function(){
    $('#mainModalDiv').dialog();
  });

  // ferme le modal après avoir appuyer sur "se Connecter"
  $('#mainModalButton').click(function(){
    $('#mainModalDiv').dialog("close");
  });

});
