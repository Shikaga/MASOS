var Agent = function(spriteHandler, x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.spriteHandler = spriteHandler;
	this.state = new State(this);
};

Agent.prototype.draw = function() {
	this.sprite = this.spriteHandler.createCircleSprite(this.x, this.y, this.radius, this.state.color);
};

Agent.prototype.receiveBlock = function(doBlock) {
	this.doBlock = doBlock
};

Agent.prototype.step = function() {
	if (this.doBlock != null) {
		this.doBlock.invoke(this);
		if (this.sprite) {
			this.sprite.remove();
		}
		this.draw();
	}
};
