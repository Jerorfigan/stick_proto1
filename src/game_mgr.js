var R = require("../lib/ramda.min.js");
var Player = require("./player.js");
var PhysEquiTri = require("./phys_equi_tri.js");
var PhysRegPoly = require("./phys_reg_poly.js");
var GameState = require("./game_state.js");
var Vector2D = require("./math/vector2d.js");
var settings = require("./settings.js");
var FX = require("./fx/FX.js");

var GameManager = function(){
	this.fx = new FX();
	this.gameState = new GameState();

	this.init();
};

GameManager.prototype.init = function(){
	this.gameState.addObj(
		new Player(this.gameState, "player", new Vector2D(settings.logicSpace.width/3, settings.logicSpace.height - settings.playerHeight/2))
	);
	this.gameState.addObj(
		new PhysEquiTri("tri1", new Vector2D(settings.logicSpace.width * 2/3, settings.logicSpace.height*4/5), 200, 0xFF0000)
	);
};

GameManager.prototype.update = function(){
	R.forEach(function(updatable){
		updatable.update();
	}, this.gameState.getObjOfType(GameState.prototype.OBJ_TYPE.UPDATEABLE));
};

GameManager.prototype.draw = function(){
	this.fx.draw(this.gameState.packageForRendering());
};

module.exports = GameManager;