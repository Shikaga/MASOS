var Agent = function(spriteHandler, x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.spriteHandler = spriteHandler;
};

Agent.prototype.draw = function() {
	this.spriteHandler.createCircleSprite(this.x, this.y, this.radius, this.color);
};

Agent.prototype.receiveBlock = function(doBlock) {
    doBlock.invoke(this);
};

Agent.prototype.setColor = function(color) {
    this.color = color;
};