/**************************************************
** GAME PLAYER CLASS
**************************************************/
var player = (function(startX, startY) {
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
		update: updateKeys,
		draw: drawImage
	}
})();

