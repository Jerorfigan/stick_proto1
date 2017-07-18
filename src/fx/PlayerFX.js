var evtMgr = require("../event_manager.js");
var utils = require("../utils.js");
var PhysRectFX = require("./PhysRectFX.js");

var PlayerFX = function(player, app){
	PhysRectFX.call(this, player, app);
}

utils.inherit(PlayerFX, PhysRectFX);

PlayerFX.prototype.onKeypress = function(e, keyUp){
	switch(e.keyCode){
		case 37:
			evtMgr.fire("LeftArrow", {id: this.fxb.id, keyUp: !!keyUp });
		break;
		case 38:
			evtMgr.fire("UpArrow", {id: this.fxb.id, keyUp: !!keyUp });
		break;
		case 39:
			evtMgr.fire("RightArrow", {id: this.fxb.id, keyUp: !!keyUp });
		break;
		case 40:
			evtMgr.fire("DownArrow", {id: this.fxb.id, keyUp: !!keyUp });
		break;
	}
};

module.exports = PlayerFX;