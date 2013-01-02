var AgentHandler = function(sh, width, height, radius) {
	this.agents = [];
	for (var i=radius; i < width; i+=radius*2) {
		for (var j = radius; j < height; j+=radius*2) {
			this.agents.push(new Agent(sh, i, j,radius));
		}
	}
	//var circle = sh.createCircleSprite(100,100,100);
	//x = circle;
}

AgentHandler.prototype.draw = function() {
	for (var i=0; i < this.agents.length; i++) {
		this.agents[i].draw();
	}
}

AgentHandler.prototype.setDoBlock = function(doBlock) {
	this.doBlock = doBlock;
}

AgentHandler.prototype.step = function() {
	if (this.doBlock != null) {
		for (var i=0; i < this.agents.length; i++) {
			this.agents[i].receiveBlock(this.doBlock);
		}
	}
}
