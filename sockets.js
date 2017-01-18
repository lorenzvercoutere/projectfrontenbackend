/**
 * Created by lorenzvercoutere on 16/01/17.
 */

module.exports = function (io) {
    io.sockets.on('connection', function (socket) {
        console.log("socket connected");

        socket.emit("login");

        socket.on("clientMessage", function (data) {
            socket.emit("serverMessage", data); //naar zichzelf
            socket.broadcast.emit("serverMessage", data);
        });

        socket.on("login", function (username) {
            socket.username = username; //socket.id
            socket.emit("serverMsg", JSON.stringify({content: "Welkom " + username}));
            socket.broadcast.emit("serverMsg", JSON.stringify({content: "Nieuwe gebruiker " + username + " is online"}));
        });

        socket.on("newplayer", function(data){
            console.log("ik kom hier....!");

            console.log("New player connected: " + data.id);
        });

        socket.on("clientMsg", function (data) {

            socket.emit("serverMsg", JSON.stringify({content: data}));
            socket.broadcast.emit("serverMsg", JSON.stringify({content: data}));
        });

    });
};