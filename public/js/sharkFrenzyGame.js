/**
 * Created by lorenzvercoutere on 17/01/17.
 */

var canvas,			// Canvas DOM element
    ctx,			// Canvas rendering context
    keys,			// Keyboard input
    localPlayer,	// Local player
    remotePlayers,	// Remote players
    score,
    startTime,
    audio,
    bite_audio,
    mute,
    soundicon,
    socket;// Socket connection

var keysGame = (function () {
    var up = false, left = false, right = false, down = false;

    var onKeyDown = function(e) {
        var that = this,
            c = e.keyCode;
        switch (c) {
            // Controls
            case 37: // Left
                that.left = true;
                break;
            case 38: // Up
                that.up = true;
                break;
            case 39: // Right
                that.right = true; // Will take priority over the left key
                break;
            case 40: // Down
                that.down = true;
                break;
            case 81: // Left
                that.left = true;
                break;
            case 90: // Up
                that.up = true;
                break;
            case 68: // Right
                that.right = true; // Will take priority over the left key
                break;
            case 83: // Down
                that.down = true;
                break;
        }
    };

    var onKeyUp = function(e) {
        var that = this,
            c = e.keyCode;
        switch (c) {
            case 37: // Left
                that.left = false;
                break;
            case 38: // Up
                that.up = false;
                break;
            case 39: // Right
                that.right = false;
                break;
            case 40: // Down
                that.down = false;
                break;
            case 81: // Left
                that.left = false;
                break;
            case 90: // Up
                that.up = false;
                break;
            case 68: // Right
                that.right = false;
                break;
            case 83: // Down
                that.down = false;
                break;
        }
    };

    return {
        up: up,
        left: left,
        right: right,
        down: down,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp
    };
})();
var player = (function() {
    var x,
        y,
        id,
        moveAmount = 2,
        worldHeight = 1440,
        worldWidth = 2560,
        vX = 0,
        vY = 0,
        vWidth = 1280,
        vHeight = 720;

    // Getters and setters
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };

    // Update player position
    var updateKeys = function(keys) {


        // Previous position
        var prevX = x,
            prevY = y;



        // Up key takes priority over down
        if (keys.up) {
            if(prevY > -(worldHeight/2)-80) y -= moveAmount;
            /*y -= moveAmount;*/

        } else if (keys.down) {
            if(prevY < (worldHeight/2)-125)	y += moveAmount;
            /*y += moveAmount;*/

        }

        // Left key takes priority over right
        if (keys.left) {
            if(prevX > -(worldWidth/2)-25) x -= moveAmount;
            /*x -= moveAmount;*/

        } else if (keys.right) {
            if(prevX < (worldWidth/2 - 80)) x += moveAmount;
            /*x += moveAmount;*/

        }



        return (prevX != x || prevY != y) ? true : false;
    };


    var spriteWidth = 6200;
    var spriteHeight = 200;
    var cols = 31;

    var width = spriteWidth/cols;
    var height = spriteHeight;

    var curFrame = 0;

    var frameCount = 31;

    var srcX = 0;
    var srcY = 0;
    var lr;
    // Draw player
    var drawImage = function(ctx) {
        //ctx.fillRect(x-5, y-5, 30, 30);
        /* CODE FOR VIEWPORT*********
         vX = x - Math.floor(0.5 * vWidth);
         if (vX < 0) vX = 0;
         if (vX+vWidth > worldWidth) vX = worldWidth - vWidth;


         vY = y - Math.floor(0.5 * vHeight);
         if (vY < 0) vY = 0;
         if (vY+vHeight > worldHeight) vY = worldHeight - vHeight;
         */
        if(keys.left){
            lr = "l"
        }else if(keys.right){
            lr = "r";
        }

        var img = new Image;
        //console.log(lr);
        if(lr == undefined){
            //console.log('dafuq');
            img.src = 'http://i.imgur.com/BcMNf1R.png'; //shark: http://i.imgur.com/MKJpTNq.png
        }
        if(lr == "l"){
            //console.log('l');
            img.src = 'http://i.imgur.com/BcMNf1R.png';
        }
        if(lr == "r"){
            //console.log('r');
            img.src = 'http://i.imgur.com/zYvAAMe.png';
        }



        updateFrame();

        ctx.drawImage(img,srcX,srcY,width,height,x,y, width,height);



    };

    function updateFrame(){

        curFrame = ++curFrame % frameCount;
        srcX = curFrame * width;
    }

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        updateKeys: updateKeys,
        drawImage: drawImage
    }
})();

function initGame(){
    //console.log("init game...");

    score = 0;
    startTime = Math.round(new Date().getTime() / 1000);
    audio = document.getElementById('background_audio');
    bite_audio = document.getElementById('bite_audio');
    mute = document.getElementById('mute');
    soundicon = document.getElementById('soundicon');


    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth - 200;//window.innerWidth - 200;
    canvas.height = window.innerHeight - 200;//window.innerHeight - 200;

    //keys = new KeysGame();
    //mouse = new MouseGame();

    keys = keysGame;
    //mouse = new MouseGame();

    var startX = Math.round(Math.random()*(canvas.width-200)),
        startY = Math.round(Math.random()*(canvas.height-200));

    remotePlayers = [];

    socket = io.connect(location.protocol + "//" + location.hostname +  ":" + location.port);

    localPlayer = player;
    localPlayer.setX(startX);
    localPlayer.setY(startY);

    socket.on("onConnection", function () {
        /*console.log("connected players: " + remotePlayers.length);

        //console.log(localPlayer);




        socket.emit("newplayer", {x: startX, y: startY});

        socket.on("newplayeradded", function (data) {
            //console.log("Newplayeradded value: " + data);

            //console.log(localPlayer);

            var newPlayer = player;
            newPlayer.setX(data.x);
            newPlayer.setY(data.y);
            //newPlayer.id = data.id;

            //console.log(newPlayer);

            //console.log("local player x-value: " + localPlayer.getX() + ", y-value: " + localPlayer.getY());
            //console.log("new player x-value: " + newPlayer.getX() + ", y-value: " + newPlayer.getY());

            remotePlayers.push(newPlayer);

            //console.log("remotePlayers na invoeren nieuwe gebruiker: " + remotePlayers.length);


            console.log("remote players na adden newplayer: " + remotePlayers.length);
            for(var i = 0; i < remotePlayers.length; i++){
                var id = i +1;
                console.log("Player: " + id + ", x-value: " + remotePlayers[i].getX() + ", y-value: " + remotePlayers[i].getY());
            }

        });*/


        score = Math.round(new Date().getTime() / 1000) - startTime;

        setEventHandlers();
    });

    //console.log("StartX: " + startX);
    //console.log("StartY: " + startY);

    //localPlayer = new Player(startX, startY);






    //console.log("remotePlayers voor invoeren nieuwe gebruiker: " + remotePlayers.length);

    //console.log("lokale player x-value: " + localPlayer.getX() + ", y-value: " + localPlayer.getY());


    function setEventHandlers(){
        //console.log("set handlers...");

        mute.addEventListener("click", playMuteAudio);

        window.addEventListener("keydown", onKeydown, false);
        window.addEventListener("keyup", onKeyup, false);

        window.addEventListener("resize", onResize, false);

        socket.emit("newplayer", {x: localPlayer.getX(), y: localPlayer.getY()});

        socket.on("newplayeradded", function (data) {
            //console.log("Newplayeradded value: " + data);

            var newPlayer = player;
            newPlayer.setX(data.x);
            newPlayer.setY(data.y);
            //newPlayer.id = data.id;

            //console.log(newPlayer);

            //console.log("local player x-value: " + localPlayer.getX() + ", y-value: " + localPlayer.getY());
            //console.log("new player x-value: " + newPlayer.getX() + ", y-value: " + newPlayer.getY());

            remotePlayers.push(newPlayer);

            //console.log("remotePlayers na invoeren nieuwe gebruiker: " + remotePlayers.length);

            draw();
        });
    }

    function playMuteAudio() {
        console.log("mute");
        if(audio.volume == 0){
            audio.volume = 1;
            bite_audio.volume = 1;
            soundicon.setAttribute("class", "fa fa-volume-up");
        }else if (audio.volume == 1){
            audio.volume = 0;
            bite_audio.volume = 0;
            soundicon.setAttribute("class", "fa fa-volume-off");
        }
    }

    function onKeydown(e) {
        if (localPlayer) {
            //console.log("Keycode : " + e.keyCode);
            keys.onKeyDown(e);
            if(keys.left == true){
                //console.log("going left...");
                localPlayer.setX(localPlayer.getX() - 3);
            }
            else if(keys.down == true){
                //console.log("going down...");
                localPlayer.setY(localPlayer.getY() + 3);
            }
            else if(keys.up == true){
                //console.log("going up...");
                localPlayer.setY(localPlayer.getY() - 3);
            }
            else if(keys.right == true){
                //console.log("going right...");
                localPlayer.setX(localPlayer.getX() + 3);
            }
        }
        animate();
    }
    function onKeyup(e) {
        if (localPlayer) {
            keys.onKeyUp(e);
        }
    }

    function onResize(e) {
        canvas.width = 1280;
        canvas.height = 720;
    }

    function onSocketConnected() {
        console.log("Connected to socket server");

        //console.log("localPlayer: " + localPlayer);

        //console.log("localPlayer.X: " + localPlayer.getX());
        //console.log("localPlayer.Y: " + localPlayer.getY());

        // Send local player data to the game server
        socket.emit("newplayer", {x: localPlayer.getX(), y: localPlayer.getY()});

        animate();
    }

    function onSocketDisconnect() {
        console.log("Disconnected from socket server");
    }

    function onNewPlayer(data) {
        console.log("ik kom hier....!");

        console.log("New player connected: "+data.id);

        //var newPlayer = new Player(data.x, data.y);
        var newPlayer = player;
        newPlayer.setX(data.x);
        newPlayer.setY(data.y);
        newPlayer.id = data.id;

        console.log(newPlayer);

        remotePlayers.push(newPlayer);

    }

    function onMovePlayer(data) {
        var movePlayer = playerById(data.id);

        if (!movePlayer) {
            console.log("Player not found: "+data.id);
            return;
        }

        movePlayer.setX(data.x);
        movePlayer.setY(data.y);
    }

    function onRemovePlayer(data) {
        var removePlayer = playerById(data.id);

        if (!removePlayer) {
            console.log("Player not found: "+data.id);
            return;
        }

        remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
    }

    function animate() {
        //console.log("animate game...");
        update();
        draw();



        // Request a new animation frame using Paul Irish's shim
        window.requestAnimFrame = animate;
    }

    function update() {
       //console.log("update game...");
        // Update local player and check for change
        if (localPlayer.updateKeys(keys)) {
            // Send local player data to the game server
            socket.emit("moveplayer", {x: localPlayer.getX(), y: localPlayer.getY()});
            //timer test
            score = Math.round(new Date().getTime() / 1000) - startTime;
            // call collision function on a movement
            checkCollision(localPlayer, remotePlayers);
        }
    }

    function clamp(value, min, max){
        if(value < min) return min;
        else if(value > max) return max;
        return value;
    }

    function draw() {
        //console.log("draw game...");

        ctx.setTransform(1,0,0,1,0,0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var camX = clamp(-localPlayer.getX() + canvas.width/2, 0, canvas.width*2 - canvas.width);
        var camY = clamp(-localPlayer.getY() + canvas.height/2, 0, canvas.height*2 - canvas.height);

        ctx.translate( camX, camY );

        ctx.font="16px Verdana";
        ctx.fillText("Score: " + score ,190,20);
        // Draw the local player
        localPlayer.drawImage(ctx);


        var i;
        //console.log("Aantal spelers: "+remotePlayers.length);
        for (i = 0; i < remotePlayers.length; i++) {
            //console.log("Teken speler: " + i + ", x-value: " + remotePlayers[i].getX() + ", y-value: " + remotePlayers[i].getY());
            remotePlayers[i].drawImage(ctx);
        }
    }

    function checkCollision(local, remotes){
        //console.log(local.getX() + " " + local.getY());
        var localX = local.getX();
        var localY = local.getY();
        var sharkWidth = 150;
        var sharkHeight = 50;
        var i;
        for (i = 0; i < remotes.length; i++){
            if(localX < remotes[i].getX() + sharkWidth &&
                localX + sharkWidth - 120 > remotes[i].getX() &&
                localY < remotes[i].getY() + sharkHeight &&
                localY + sharkHeight > remotes[i].getY()){
                //console.log("collision?");
                //console.log(playerById(remotes[i].id));
                score = 0;
                startTime = Math.round(new Date().getTime() / 1000);
                bite_audio.play();
            }else{
                bite_audio.pause();
            }
        }

        //console.log(remotes);
    }

    function playerById(id) {
        var i;
        for (i = 0; i < remotePlayers.length; i++) {
            if (remotePlayers[i].id == id)
                return remotePlayers[i];
        }

        return false;
    }
}