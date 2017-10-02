$(function(){
  $('#chatForm').submit(function(){
    socket.emit('chatMessage', $('#chatText').val());
    $('#chatText').val(''); // vide l'input
    return false; //désactive le rechargement de la page au submit
  });
  
  socket.on('chatMessage', function(msg){
    $('#chatMessages').append('<li class="list-group-item">[' + msg.date + '] ' + msg.user + ': ' + msg.msg +'</li>');
  });

  $.ajax({
    url: '/post',
    type: 'POST',
    data: {
      action:'loadChatUsers'
    },
    success: function(ret){
      var ret = JSON.parse(ret);
      gererOutput(ret.num, 'loading chat users');
      for(var user in ret.map){
        $('#chatUsers').append('<li class="list-group-item"><a name="' + ret.map[user].id_user + '">' + ret.map[user].login + '</a></li>');
      }
      $('#chatUsers').find('a').each(function(){
        $(this).click(function(){
          var id_user = $(this).attr('name');
            loadPage('user','contentContainer', function(){
              loadChatUser(id_user);
            });
        });
      });
    },
    error: function(ret){
      gererOutput(2, 'loading chat users');
    }
  })
});
