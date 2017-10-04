$(function(){
    
    console.log("salut");
    socket.emit('lancerJeu1');
    
    socket.on('lancerJeu1', function(){
        console.log("le jeu a commencé !");
    });
    
});