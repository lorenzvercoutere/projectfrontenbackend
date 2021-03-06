/**
 * Created by lorenzvercoutere on 16/01/17.
 */

function toggle_div_chat(id) {
        var divelement = document.getElementById(id);
        var chatButton = document.getElementById("btn_chat");
        chatButton.style.marginRight = "-10px";
        if(divelement.style.display == 'none'){
            divelement.style.display = 'inline-block';
            //divelement.style.transition ='0.4s';
            initChat();
        }
        else {
            chatButton.style.marginRight = "0px";
            divelement.style.display = 'none';
        }
    }

function initChat(){
        "use strict";
        console.log("sockets initialised for chat");

        var inpClient = document.getElementById("inpClient");
        var messages = document.getElementById("messages");

        var socket = io.connect(location.protocol + "//" + location.hostname +  ":" + location.port);

        inpClient.onkeydown = function (keyboardEvt) {
            if(keyboardEvt.keyCode === 13){
                socket.emit("clientMsg", inpClient.value);
                return false;
            } else {
                return true;
            }
        };

        /*socket.on("login", function (data) {
            console.log("inserting username...");
         var username = window.prompt("Kies een username", "Lorenz");
         socket.emit("login", username);
         });*/

        socket.on("serverMsg", function (data) {
            var newMsg = document.createElement("div");
            newMsg.appendChild(document.createTextNode(JSON.parse(data).content));

            messages.insertBefore(newMsg, messages.childNodes[0]);
        });
}