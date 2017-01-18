/**
 * Created by lorenzvercoutere on 16/01/17.
 */

module.exports = function (io) {
    io.sockets.on('connection', function (socket) {
        console.log("socket connected");

        socket.emit("onConnection");

        socket.emit("login");

        socket.on("clientMessage", function (data) {
            socket.emit("serverMessage", data); //naar zichzelf
            socket.broadcast.emit("serverMessage", data);
        });

        socket.on("login", function (username) {
            //console.log("gebruiker wordt ingelogd: " + username);
            socket.username = username; //socket.id
            socket.emit("serverMsg", JSON.stringify({content: "Welkom " + username}));
            socket.broadcast.emit("serverMsg", JSON.stringify({content: "Nieuwe gebruiker " + username + " is online"}));
        });

        socket.on("newplayer", function(data){
            //console.log("ik kom hier....!");

            //console.log("New player X-value: " + data.x);
            //console.log("New player Y-value: " + data.y);
            socket.emit("newplayeradded", {x: data.x, y: data.y});
            socket.broadcast.emit("newplayeradded", {x: data.x, y: data.y});
        });

        /*socket.on("moveplayer", function (data) {
           //console.log("moving player...");
        });*/

        /**socket.on("test", function (text) {
            console.log("Dit is een test: " + text);
        });**/

        socket.on("clientMsg", function (data) {
            console.log("Username is: " + socket.username);
            data = socket.username + ": " + data;
            socket.emit("serverMsg", JSON.stringify({content: data}));
            socket.broadcast.emit("serverMsg", JSON.stringify({content: data}));
        });

    });
};