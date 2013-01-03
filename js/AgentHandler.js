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
	if (doBlock != null) {
		for (var i=0; i < this.agents.length; i++) {
			this.agents[i].receiveBlock(doBlock);
		}
	}
}

AgentHandler.prototype.step = function() {
	for (var i=0; i < this.agents.length; i++) {
		this.agents[i].step();
	}
}

AgentHandler.prototype.getAdjacentAgents = function(agent) {
	var adjacentAgents = [];
	for (var i=0; i < this.agents.length; i++) {
		if (this.agents[i] != agent) {
			var xDiff = this.agents[i].x - agent.x;
			var yDiff = this.agents[i].y - agent.y;
			var xDiffSquare = xDiff * xDiff;
			var yDiffSquare = yDiff * yDiff;
			var radiusCombined = this.agents[i].radius + agent.radius;
			var radiusCombinedSquare = radiusCombined * radiusCombined;
			if (xDiffSquare + yDiffSquare <= radiusCombinedSquare) {
				adjacentAgents.push(this.agents[i]);
			}
		}
	}
	return adjacentAgents;
}

AgentHandler.prototype.broadcast = function(agent, doBlock) {
	var agents = this.getAdjacentAgents(agent);
	for (var i=0; i < agents.length; i++) {
		agents[i].receiveBlock(doBlock);
	}
}
