$(function(){
  $('#chatForm').submit(function(){
    socket.emit('chatMessage', $('#chatText').val());
    $('#chatText').val(''); // vide l'input
    return false;
  });
  socket.on('chatMessage', function(msg){
    var currentdate = new Date();
    var datetime = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
    $('#chatMessages').append('<li>[' + msg.date + '] ' + msg.user + ': ' + msg.msg +'</li>');
  });
});
