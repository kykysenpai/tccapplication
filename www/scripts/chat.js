$(function(){


    $('#chatForm').submit(function(){
        socket.emit('chatMessage', $('#chatText').val());
        $('#chatText').val(''); // vide l'input
        return false; //désactive le rechargement de la page au submit
    });

    var connected_users;

    socket.on('chatMessage', function(msg){
        $('#chatMessages').append('<li class="list-group-item">[' + msg.date + '] ' + msg.user + ': ' + msg.msg +'</li>');
    });
    socket.on('current_users', function(data){
        connected_users = data
        for(var id_user in connected_users){
            $('#chatUsers').find('a').each(function(){
               if($(this).attr('name') == id_user)
                   $(this).addClass('active');
            });
        }
    });
    socket.on('connected_user', function(id_user){
        $('#chatUsers').find('a').each(function(){
            if($(this).attr('name') == id_user)
                $(this).addClass('active');
        });
    });
    socket.on('disconnected_user', function(id_user){
        $('#chatUsers').find('a').each(function(){
            if($(this).attr('name') == id_user)
                $(this).removeClass('active');
        });
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
                $('#chatUsers').append('<a class="list-group-item" name="'+ret.map[user].id_user+'">' + ret.map[user].login + '</a>');
            }

            $('#chatUsers').find('a').each(function(){
                $(this).click(function(){
                    var id_user = $(this).attr('name');
                    loadPage('user','contentContainer', function(){
                        loadChatUser(id_user);
                    });
                });
            });
            socket.emit('current_users', null);
        },
        error: function(ret){
            gererOutput(2, 'loading chat users');
        }
    });

});
