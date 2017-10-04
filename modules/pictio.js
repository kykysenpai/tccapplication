exports.start = function(socket, io){
    console.log("OH BOY HERE WE GO.");
    socket.emit('gameBegins');
};
