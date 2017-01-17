/**************************************************
** GAME VARIABLES
**************************************************/
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



/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	// Maximise the canvas
	canvas.width = 1280;//window.innerWidth - 200;
	canvas.height = 720;//window.innerHeight - 200;


	// Initialise keyboard controls
	keys = new Keys();
	mouse = new Mouse();

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
	setEventHandlers();
}




/**************************************************
** GAME EVENT HANDLERS
**************************************************/
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
	}
}



// Browser window resize
function onResize(e) {
	// Maximise the canvas
	canvas.width = 1280;
	canvas.height = 720;
}

// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");

	// Send local player data to the game server
	socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY()});

}

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
}

// New player
function onNewPlayer(data) {
	console.log("New player connected: "+data.id);

	// Initialise the new player
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = data.id;

	// Add new player to the remote players array
	remotePlayers.push(newPlayer);

}

// Move player
function onMovePlayer(data) {
	var movePlayer = playerById(data.id);

	// Player not found
	if (!movePlayer) {
		console.log("Player not found: "+data.id);
		return;
	}

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
}

// Remove player
function onRemovePlayer(data) {
	var removePlayer = playerById(data.id);

	// Player not found
	if (!removePlayer) {
		console.log("Player not found: "+data.id);
		return;
	}

	// Remove player from array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
}


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
	}
}

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
	}
}



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
	}
	
	return false;
}



/****************************************************/
