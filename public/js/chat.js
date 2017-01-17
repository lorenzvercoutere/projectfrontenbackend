/**
 * Created by lorenzvercoutere on 16/01/17.
 */

function toggle_div_chat(id) {
        var divelement = document.getElementById(id);
        if(divelement.style.display == 'none'){
            divelement.style.display = 'block';
            divelement.style.transition ='0.4s';

            initChat();
        }
        else
            divelement.style.display ='none';
    }

function initChat(){
        "use strict";
        console.log("sockets initialised for chat");

//0. andere variabelen
        var inpClient = document.getElementById("inpClient");
        var messages = document.getElementById("messages");

//1. socket initialiseren
        var socket = io.connect(location.protocol + "//" + location.hostname +  ":" + location.port);

//2. handlers
        inpClient.onkeydown = function (keyboardEvt) {
            if(keyboardEvt.keyCode === 13){
                socket.emit("clientMsg", inpClient.value);
                return false;
            } else {
                return true;
            }
        };

        socket.on("login", function (data) {
         var username = window.prompt("Kies een username", "Lorenz");
         socket.emit("login", username);
         });

        socket.on("serverMsg", function (data) {
            var newMsg = document.createElement("div");
            newMsg.appendChild(document.createTextNode(JSON.parse(data).content));

            messages.insertBefore(newMsg, messages.childNodes[0]);
        });
}