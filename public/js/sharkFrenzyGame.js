/**
 * Created by lorenzvercoutere on 17/01/17.
 */
var canvas,			// Canvas DOM element
    ctx,			// Canvas rendering context
    keys,			// Keyboard input
    mouse,
    localPlayer,	// Local player
    remotePlayers,	// Remote players
    score = 0,
    startTime = Math.round(new Date().getTime() / 1000),
    audio = document.getElementById('background_audio'),
    bite_audio = document.getElementById('bite_audio'),
    mute = document.getElementById('mute'),
    soundicon = document.getElementById('soundicon'),
    socket;			// Socket connection

var KeysGame = function (up, left, right, down) {
    var up = up || false,
        left = left || false,
        right = right || false,
        down = down || false;

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
};
var MouseGame = function (mousePosX, mousePosY) {
    var mousePosX,
        mousePosY;
    var mouseover = function (e) {
        var that = this;
        that.mousePosX = e.clientX;
        that.mousePosY = e.clientY;
    };

    return{
        mousePosX: mousePosX,
        mousePosY: mousePosY
    };
};



var Player = function(startX, startY) {
    var x = startX,
        y = startY,
        id,
        moveAmount = 2,
        worldHeight = 1440,
        worldWidth = 2560,
        vX = 0,
        vY = 0,
        vWidth = 1280,
        vHeight = 720;

    // Getters and setters
    var getX = function () {
        return x;
    };

    var getY = function () {
        return y;
    };

    var setX = function (newX) {
        x = newX;
    };

    var setY = function (newY) {
        y = newY;
    };

    // Update player position
    var update = function (keys) {


        // Previous position
        var prevX = x,
            prevY = y;


        // Up key takes priority over down
        if (keys.up) {
            if (prevY > -(worldHeight / 2) - 80) y -= moveAmount;
            /*y -= moveAmount;*/

        } else if (keys.down) {
            if (prevY < (worldHeight / 2) - 125)    y += moveAmount;
            /*y += moveAmount;*/

        }
        ;

        // Left key takes priority over right
        if (keys.left) {
            if (prevX > -(worldWidth / 2) - 25) x -= moveAmount;
            /*x -= moveAmount;*/

        } else if (keys.right) {
            if (prevX < (worldWidth / 2 - 80)) x += moveAmount;
            /*x += moveAmount;*/

        }
        ;


        return (prevX != x || prevY != y) ? true : false;
    };


    var spriteWidth = 6200;
    var spriteHeight = 200;
    var cols = 31;

    var width = spriteWidth / cols;
    var height = spriteHeight;

    var curFrame = 0;

    var frameCount = 31;

    var srcX = 0;
    var srcY = 0;
    var lr;
    // Draw player
    var draw = function (ctx) {
        //ctx.fillRect(x-5, y-5, 30, 30);
        /* CODE FOR VIEWPORT*********
         vX = x - Math.floor(0.5 * vWidth);
         if (vX < 0) vX = 0;
         if (vX+vWidth > worldWidth) vX = worldWidth - vWidth;


         vY = y - Math.floor(0.5 * vHeight);
         if (vY < 0) vY = 0;
         if (vY+vHeight > worldHeight) vY = worldHeight - vHeight;
         */
        if (keys.left) {
            lr = "l"
        } else if (keys.right) {
            lr = "r";
        }

        var img = new Image;
        //console.log(lr);
        if (lr == undefined) {
            //console.log('dafuq');
            img.src = 'http://i.imgur.com/BcMNf1R.png'; //shark: http://i.imgur.com/MKJpTNq.png
        }
        if (lr == "l") {
            //console.log('l');
            img.src = 'http://i.imgur.com/BcMNf1R.png';
        }
        if (lr == "r") {
            //console.log('r');
            img.src = 'http://i.imgur.com/zYvAAMe.png';
        }


        updateFrame();

        ctx.drawImage(img, srcX, srcY, width, height, x, y, width, height);


    };

    function updateFrame() {

        curFrame = ++curFrame % frameCount;
        srcX = curFrame * width;
    }

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        update: update,
        draw: draw
    }
};


function initGame(){
    // Declare the canvas and rendering context
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // Maximise the canvas
    canvas.width = 1280;//window.innerWidth - 200;
    canvas.height = 720;//window.innerHeight - 200;


    // Initialise keyboard controls
    keys = new KeysGame();
    mouse = new MouseGame();

    // Calculate a random start position for the local player
    // The minus 5 (half a player size) stops the player being
    // placed right on the egde of the screen
    var startX = Math.round(Math.random()*(canvas.width-30)),
        startY = Math.round(Math.random()*(canvas.height-30));

    // Initialise the local player
    localPlayer = new Player(startX, startY);


    // Initialise socket connection
    socket = io.connect("http://localhost", {port: 3000, transports: ["websocket"]});

    // Initialise remote players array
    remotePlayers = [];

    //timer test
    score = Math.round(new Date().getTime() / 1000) - startTime;

    // Start listening for events
    setEventHandlers;

    var setEventHandlers = function() {

        mute.addEventListener("click", playMuteAudio);

        // Keyboard
        window.addEventListener("keydown", onKeydown, false);
        window.addEventListener("keyup", onKeyup, false);


        // Window resize
        window.addEventListener("resize", onResize, false);

        // Socket connection successful
        socket.on("connect", onSocketConnected);

        // Socket disconnection
        socket.on("disconnect", onSocketDisconnect);

        // New player message received
        socket.on("new player", onNewPlayer);

        // Player move message received
        socket.on("move player", onMovePlayer);

        // Player removed message received
        socket.on("remove player", onRemovePlayer);
    };

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

// Keyboard key down
    function onKeydown(e) {
        if (localPlayer) {
            keys.onKeyDown(e);
        }
    }

// Keyboard key up
    function onKeyup(e) {
        if (localPlayer) {
            keys.onKeyUp(e);
        };
    };



// Browser window resize
    function onResize(e) {
        // Maximise the canvas
        canvas.width = 1280;
        canvas.height = 720;
    };

// Socket connected
    function onSocketConnected() {
        console.log("Connected to socket server");

        // Send local player data to the game server
        socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY()});

    };

// Socket disconnected
    function onSocketDisconnect() {
        console.log("Disconnected from socket server");
    };

// New player
    function onNewPlayer(data) {
        console.log("New player connected: "+data.id);

        // Initialise the new player
        var newPlayer = new Player(data.x, data.y);
        newPlayer.id = data.id;

        // Add new player to the remote players array
        remotePlayers.push(newPlayer);

    };

// Move player
    function onMovePlayer(data) {
        var movePlayer = playerById(data.id);

        // Player not found
        if (!movePlayer) {
            console.log("Player not found: "+data.id);
            return;
        };

        // Update player position
        movePlayer.setX(data.x);
        movePlayer.setY(data.y);
    };

// Remove player
    function onRemovePlayer(data) {
        var removePlayer = playerById(data.id);

        // Player not found
        if (!removePlayer) {
            console.log("Player not found: "+data.id);
            return;
        };

        // Remove player from array
        remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
    };


    /**************************************************
     ** GAME ANIMATION LOOP
     **************************************************/
    function animate() {
        update();
        draw();

        // Request a new animation frame using Paul Irish's shim
        window.requestAnimFrame(animate);
    };


    /**************************************************
     ** CAMERA
     **************************************************/



    /**************************************************
     ** GAME UPDATE
     **************************************************/
    function update() {
        // Update local player and check for change
        if (localPlayer.update(keys)) {
            // Send local player data to the game server
            socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY()});
            //timer test
            score = Math.round(new Date().getTime() / 1000) - startTime;
            // call collision function on a movement
            checkCollision(localPlayer, remotePlayers);
        };
    };

    function clamp(value, min, max){
        if(value < min) return min;
        else if(value > max) return max;
        return value;
    }

    /**************************************************
     ** GAME DRAW
     **************************************************/
    function draw() {
        // Wipe the canvas clean
        ctx.setTransform(1,0,0,1,0,0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Clamp the camera position to the world bounds while centering the camera around the player
        var camX = clamp(-localPlayer.getX() + canvas.width/2, 0, canvas.width*2 - canvas.width);
        var camY = clamp(-localPlayer.getY() + canvas.height/2, 0, canvas.height*2 - canvas.height);

        ctx.translate( camX, camY );

        ctx.font="16px Verdana";
        ctx.fillText("Score: " + score ,190,20);
        // Draw the local player
        localPlayer.draw(ctx);


        // Draw the remote players
        var i;
        for (i = 0; i < remotePlayers.length; i++) {
            remotePlayers[i].draw(ctx);
        };
    };



    /******************************************************
     * CollisionDetection
     ******************************************************/

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
                console.log("collision?");
                console.log(playerById(remotes[i].id));
                score = 0;
                startTime = Math.round(new Date().getTime() / 1000);
                bite_audio.play();
            }else{
                bite_audio.pause();
            }
        }

        //console.log(remotes);
    }



    /**************************************************
     ** GAME HELPER FUNCTIONS
     **************************************************/
// Find player by ID
    function playerById(id) {
        var i;
        for (i = 0; i < remotePlayers.length; i++) {
            if (remotePlayers[i].id == id)
                return remotePlayers[i];
        };

        return false;
    };
}