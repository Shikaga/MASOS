var Agent = function(spriteHandler) {
	this.spriteHandler = spriteHandler;
};

Agent.prototype.draw = function() {
	this.spriteHandler.createCircleSprite(10,10,10);
};