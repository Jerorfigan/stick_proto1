var Settings = function(){
	this.init();
};

Settings.prototype.init = function(){
	// Frame Rate
	this.fps = 30;
	this.framePeriod = 1/this.fps;
	
	// Rendering
	this.zBufferCnt = 2;
	this.logicSpace = {
		width: 1000,
		height: 1000
	};
	this.renderSpace = {
		width: 700,
		height: 700
	};

	// Keypress
	this.rotateCounterClockwiseKey = "z";
	this.rotateClockwiseKey = "x";

	// Rotation
	this.deltaRadOnRotate = Math.PI/18;

	// Player
	this.playerWidth = 50;
	this.playerHeight = 100;
	this.playerColor = 0xFF0000;
	this.playerMoveVelocity = 75;
	this.playerJumpVelocity = 100;
	this.accelOfGravity = 25;
};

module.exports = new Settings();