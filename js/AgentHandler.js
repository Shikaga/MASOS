var AgentHandler = function(sh, width, height, radius) {
	this.spriteHandler = sh;
	this.agents = [];
	for (var i=radius; i < width; i+=radius*2) {
		for (var j = radius; j < height; j+=radius*2) {
			this.agents.push(new Agent(this, i, j,radius));
		}
	}
	this.stepInProgress = false;
	this.queuedBroadcast = [];
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
	this.stepsCompleted();
	this.stepInProgress = true;
	for (var i=0; i < this.agents.length; i++) {
		this.agents[i].step();
	}
	this.stepInProgress = false;
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
	this.queuedBroadcast.push({"agent": agent, "doBlock": doBlock});
}

AgentHandler.prototype.stepsCompleted = function() {
	for (var i=0; i < this.queuedBroadcast.length; i++) {
		var agents = this.getAdjacentAgents(this.queuedBroadcast[i].agent);
		for (var j=0; j < agents.length; j++) {
			agents[j].receiveBroadcast(this.queuedBroadcast[i].doBlock);
		}
	}
	this.queuedBroadcast = [];
}
