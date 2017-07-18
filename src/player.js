var utils = require("./utils.js");
var settings = require("./settings.js");
var PhysRect = require("./phys_rect.js");
var evtMgr = require("./event_manager.js");
var Vector2D = require("./math/vector2d.js");
var phys2D = require("./math/physics2d.js");

var Player = function(gameState, id, pos){
	this.gameState = gameState;
	PhysRect.call(this, id, pos, settings.playerWidth, settings.playerHeight, settings.playerColor);

	// Physics attrs
	this.velocity = new Vector2D(0,0);
	this.acceleration = new Vector2D(0,0);
	this.inMidAir = false;
	this.lastPos = this.polygon.center;

	// Player move events
	evtMgr.subscribe("LeftArrow", onPlayerMovedLeft, this);
	evtMgr.subscribe("UpArrow", onPlayerJumped, this);
	evtMgr.subscribe("RightArrow", onPlayerMovedRight, this);
	evtMgr.subscribe("DownArrow", onPlayerMovedDown, this);
};

utils.inherit(Player, PhysRect);

Player.prototype.update = function(){
	// Update position
	this.velocity = this.velocity.add(this.acceleration.scale(settings.framePeriod));
	var oldPos = this.polygon.center;
	this.polygon.center = this.polygon.center.add(this.velocity.scale(settings.framePeriod));
	
	function landedJump(){
		this.polygon.center.y = oldPos.y;
		this.acceleration = new Vector2D(0,0);
		this.velocity = new Vector2D(0, 0);
		this.inMidAir = false;
	}

	if(this.polygon.center.x < settings.playerWidth/2 || this.polygon.center.x > settings.logicSpace.width - settings.playerWidth/2){
		this.polygon.center.x = oldPos.x;
	}
	if(this.polygon.center.y < settings.playerHeight/2 || this.polygon.center.y > settings.logicSpace.height - settings.playerHeight/2){
		landedJump.call(this);
	}

	// Check for collision between player and tri1
	var tri1 = this.gameState.getObjByKey("tri1");
	if(
		phys2D.arePolygonsColliding(
			this, 
			tri1
		)
	){
		this.color = 0x00FFFF;
		tri1.color = 0x00FFFF;

		landedJump.call(this);
	}else{
		this.color = 0xFF0000;
		tri1.color = 0xFF0000;
	}

	this.lastPos = this.polygon.center;
};

module.exports = Player;

// EVENTS //

function onPlayerMovedLeft(evt, data){
	if(!this.inMidAir){
		if(data.keyUp){
			this.velocity = new Vector2D(0, 0);
		}else{
			this.velocity = new Vector2D(-settings.playerMoveVelocity, this.velocity.y);
			if(Math.abs(this.polygon.center.y - (settings.logicSpace.height - settings.playerHeight/2)) > 1) this.acceleration = new Vector2D(0, settings.accelOfGravity);
		}
	} 
}

function onPlayerJumped(evt, data){
	if(!this.inMidAir){
		this.inMidAir = true;
		this.velocity = new Vector2D(this.velocity.x, -settings.playerJumpVelocity);
		this.acceleration = new Vector2D(0, settings.accelOfGravity);
	}
}

function onPlayerMovedRight(evt, data){
	if(!this.inMidAir){
		if(data.keyUp){
			this.velocity = new Vector2D(0, 0);
		}else{
			this.velocity = new Vector2D(settings.playerMoveVelocity, this.velocity.y);
			if(Math.abs(this.polygon.center.y - (settings.logicSpace.height - settings.playerHeight/2)) > 1) this.acceleration = new Vector2D(0, settings.accelOfGravity);
		}
	}
}

function onPlayerMovedDown(evt, data){

}
