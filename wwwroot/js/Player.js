/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		id,
		moveAmount = 2;
	
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
	var update = function(keys) {
		// Previous position
		var prevX = x,
			prevY = y;

		// Up key takes priority over down
		if (keys.up) {
			if(prevY < 40) {
				y = 40;
			}else{
				y -= moveAmount;
			}
		} else if (keys.down) {
			if(prevY > 695){
				y = 695;
			}else{
				y += moveAmount;
			}
		};

		// Left key takes priority over right
		if (keys.left) {
			if(prevX < 0) {
				x = 0;
			}else{
				x -= moveAmount;
			}
		} else if (keys.right) {
			if(prevX > 1280){
				x = 1280;
			}else{
				x += moveAmount;
			}
		};



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

	// Draw player
	var draw = function(ctx) {
		//ctx.fillRect(x-5, y-5, 30, 30);



		var img = new Image;
		img.src = 'http://i.imgur.com/BcMNf1R.png'; //shark: http://i.imgur.com/MKJpTNq.png

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
		update: update,
		draw: draw
	}
};