$(function(){

    console.log("salut");
    socket.emit('lancerJeu1');

    socket.on('gameBegins', function(){
        console.log("le jeu a commencé !");
    });

});
